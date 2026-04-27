import { Globe, Image, MapPin, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { fetcher } from "../../../../fetcher";
import { useAuth } from "../../auth/hooks/useAuth";
import { toast } from "react-hot-toast";

import "emoji-picker-element";

const CreateTweet = () => {
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  const [tweet, setTweet] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 12 });

  const { user } = useAuth();
  const navigate = useNavigate();

  const MAX_HEIGHT = 200;

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
      Math.max(
        viewportPadding,
        rect.left + rect.width / 2 - pickerWidth / 2,
      ),
    );

    const showAbove =
      rect.bottom + gap + pickerHeight > window.innerHeight - viewportPadding &&
      rect.top - gap - pickerHeight >= viewportPadding;

    const top = showAbove ? rect.top - pickerHeight - gap : rect.bottom + gap;

    setPickerPosition({ top, left });
  };

  /* =========================
     Emoji Picker Fix
  ========================= */
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

  /* =========================
     Auto textarea height
  ========================= */
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

  /* =========================
     Submit Tweet
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("You need to sign in first");
      return;
    }

    const tweetData = {
      userId: user.id,
      content: tweet.trim(),
      media: "",
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
      setShowEmojiPicker(false);
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
        {/* Profile */}
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

        {/* Content */}
        <div className="w-full pl-3">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={tweet}
            onInput={handleInput}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
            className="text-x-bgOpposite custom-scrollbar w-full resize-none px-2 py-1.5 text-base font-light outline-none lg:py-2 lg:text-lg"
          />

          {/* Reply Permission */}
          <div className="text-x-blue mb-2 inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold hover:bg-blue-500/10 lg:text-sm">
            <Globe className="size-3.5 lg:size-4" />
            Everyone can reply
          </div>

          {/* Bottom Actions */}
          <div className="border-x-divider relative flex items-center justify-between border-t py-2">
            {/* Left Icons */}
            <div className="flex gap-3">
              {/* Image */}
              <label className="hover:bg-x-blue/10 inline-flex size-7 cursor-pointer items-center justify-center rounded-full lg:size-8">
                <input type="file" className="hidden" />
                <Image className="text-x-blue size-4 lg:size-4.5" />
              </label>

              {/* Emoji */}
              <button
                ref={emojiButtonRef}
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="hover:bg-x-blue/10 inline-flex size-7 items-center justify-center rounded-full lg:size-8"
              >
                <Smile className="text-x-blue size-4 lg:size-4.5" />
              </button>

              {/* Location */}
              <button
                type="button"
                className="hover:bg-x-blue/10 inline-flex size-7 items-center justify-center rounded-full lg:size-8"
              >
                <MapPin className="text-x-blue size-4 lg:size-4.5" />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !tweet.trim()}
              className="bg-x-bgOpposite text-x-textOpposite rounded-full px-5 py-1.5 text-sm font-medium disabled:opacity-60"
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
