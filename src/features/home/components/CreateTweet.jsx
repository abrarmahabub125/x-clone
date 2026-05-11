import { Globe, Image, MapPin, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

import { fetcher } from "../../../../fetcher";
import { useAuth } from "../../auth/hooks/useAuth";

import "emoji-picker-element";

const MAX_HEIGHT = 200;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const CreateTweet = () => {
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const imageInputRef = useRef(null);

  const [tweet, setTweet] = useState("");
  const [location, setLocation] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLocationField, setShowLocationField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImageDataUrl, setSelectedImageDataUrl] = useState("");
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 12 });

  const { user } = useAuth();
  const navigate = useNavigate();
  const canSubmit = Boolean(tweet.trim() || selectedImageDataUrl);

  const updatePickerPosition = () => {
    const button = emojiButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const pickerWidth = 320;
    const pickerHeight = 300;
    const viewportPadding = 12;
    const gap = 8;

    const left = Math.min(
      window.innerWidth - pickerWidth - viewportPadding,
      Math.max(viewportPadding, rect.left + rect.width / 2 - pickerWidth / 2),
    );

    const showAbove =
      rect.bottom + gap + pickerHeight > window.innerHeight - viewportPadding &&
      rect.top - gap - pickerHeight >= viewportPadding;

    const top = showAbove ? rect.top - pickerHeight - gap : rect.bottom + gap;

    setPickerPosition({ top, left });
  };

  useEffect(() => {
    if (!showEmojiPicker) return;

    const picker = pickerRef.current;
    if (!picker) return;

    const handleEmoji = (event) => {
      setTweet((prev) => prev + event.detail.unicode);
    };

    picker.addEventListener("emoji-click", handleEmoji);

    return () => {
      picker.removeEventListener("emoji-click", handleEmoji);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    if (!showEmojiPicker) return;

    updatePickerPosition();

    window.addEventListener("resize", updatePickerPosition);
    window.addEventListener("scroll", updatePickerPosition, true);

    return () => {
      window.removeEventListener("resize", updatePickerPosition);
      window.removeEventListener("scroll", updatePickerPosition, true);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    if (!showEmojiPicker) return;

    const handlePointerDown = (event) => {
      const target = event.target;

      if (
        pickerRef.current?.contains(target) ||
        emojiButtonRef.current?.contains(target)
      ) {
        return;
      }

      setShowEmojiPicker(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    handleInput();
  }, [tweet]);

  const handleInput = () => {
    const element = textareaRef.current;
    if (!element) return;

    element.style.height = "auto";

    if (element.scrollHeight > MAX_HEIGHT) {
      element.style.height = `${MAX_HEIGHT}px`;
      element.style.overflowY = "auto";
    } else {
      element.style.height = `${element.scrollHeight}px`;
      element.style.overflowY = "hidden";
    }
  };

  const removeSelectedImage = () => {
    setSelectedImageDataUrl("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleImageSelection = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error("Image size should be 5MB or less.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";

      if (!dataUrl) {
        toast.error("Could not read the selected image.");
        event.target.value = "";
        return;
      }

      setSelectedImageDataUrl(dataUrl);
    };

    reader.onerror = () => {
      toast.error("Could not read the selected image.");
      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      toast.error("You need to sign in first");
      return;
    }

    if (!canSubmit) {
      toast.error("Add some text or an image before posting.");
      return;
    }

    const tweetData = {
      content: tweet.trim(),
      media: "",
      mediaDataUrl: selectedImageDataUrl,
      location: location.trim(),
      likesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      retweetsCount: 0,
    };

    try {
      setLoading(true);

      await fetcher("/api/tweets", {
        method: "POST",
        body: JSON.stringify(tweetData),
      });

      setTweet("");
      setLocation("");
      setShowEmojiPicker(false);
      setShowLocationField(false);
      removeSelectedImage();

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.overflowY = "hidden";
      }

      toast.success("Tweet published successfully");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      toast.error(err.message || "Failed to create tweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-x-divider border-b px-4">
      <div className="flex items-start pt-4">
        <div className="size-9 shrink-0 overflow-hidden rounded-full lg:size-10">
          <img
            className="h-full w-full object-cover"
            src={
              user?.profilePic ||
              "https://i.ibb.co.com/jZZHbNL5/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-f.jpg"
            }
            alt="profile"
          />
        </div>

        <div className="w-full pl-3">
          <textarea
            ref={textareaRef}
            value={tweet}
            onInput={handleInput}
            onChange={(event) => setTweet(event.target.value)}
            placeholder="What's happening?"
            className="text-x-bgOpposite custom-scrollbar w-full resize-none px-2 py-1.5 text-base font-light outline-none lg:py-2 lg:text-lg"
          />

          {selectedImageDataUrl && (
            <div className="relative mb-3 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={selectedImageDataUrl}
                alt="Selected post media"
                className="h-auto max-h-[26rem] w-full object-cover object-center"
              />

              <button
                type="button"
                onClick={removeSelectedImage}
                className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-black/65 text-white transition-colors duration-200 hover:bg-black/80"
                aria-label="Remove selected image"
              >
                <X className="size-4.5" />
              </button>
            </div>
          )}

          {showLocationField && (
            <div className="mb-3 px-2">
              <label className="text-x-text-sec mb-1 block text-xs font-medium">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                maxLength={100}
                placeholder="Add a location"
                className="border-x-divider text-x-text w-full rounded-xl border bg-transparent px-3 py-2 text-sm transition-colors duration-200 outline-none"
              />
            </div>
          )}

          <div className="text-x-blue mb-2 inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold hover:bg-blue-500/10 lg:text-sm">
            <Globe className="size-3.5 lg:size-4" />
            Everyone can reply
          </div>

          <div className="border-x-divider relative flex items-center justify-between border-t py-2">
            <div className="flex gap-3">
              <label className="hover:bg-x-blue/10 inline-flex size-7 cursor-pointer items-center justify-center rounded-full lg:size-8">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelection}
                />
                <Image className="text-x-blue size-4 lg:size-4.5" />
              </label>

              <button
                ref={emojiButtonRef}
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className={`${showEmojiPicker ? "bg-x-blue/10 text-x-blue" : "hover:bg-x-blue/10"} inline-flex size-7 items-center justify-center rounded-full lg:size-8`}
              >
                <Smile className="text-x-blue size-4 lg:size-4.5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowLocationField((currentValue) => !currentValue)
                }
                className={`${showLocationField ? "bg-x-blue/10 text-x-blue" : "hover:bg-x-blue/10"} inline-flex size-7 items-center justify-center rounded-full lg:size-8`}
              >
                <MapPin className="text-x-blue size-4 lg:size-4.5" />
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="bg-x-bgOpposite text-x-textOpposite rounded-full px-5 py-1.5 text-sm font-medium disabled:opacity-75"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>

      {showEmojiPicker &&
        createPortal(
          <div
            className="fixed z-[250]"
            style={{
              top: `${pickerPosition.top}px`,
              left: `${pickerPosition.left}px`,
            }}
          >
            <emoji-picker ref={pickerRef}></emoji-picker>
          </div>,
          document.body,
        )}
    </form>
  );
};

export default CreateTweet;
