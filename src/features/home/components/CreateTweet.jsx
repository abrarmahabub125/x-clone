import {
  CalendarClock,
  GiftIcon,
  Globe,
  Image,
  ListTodoIcon,
  MapPin,
  Smile,
} from "lucide-react";
import { useRef } from "react";
import MyImage from "../../../shared/assets/logo/my-photo.jpg";
import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import Spinner from "../../../shared/loaders/Spinner";
import { useNavigate } from "react-router";

const CreateTweet = () => {
  const textareaRef = useRef(null);
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth().user;
  const navigate = useNavigate();

  const MAX_HEIGHT = 200;

  const handleInput = () => {
    const el = textareaRef.current;

    el.style.height = "auto";

    if (el.scrollHeight > MAX_HEIGHT) {
      el.style.height = MAX_HEIGHT + "px";
      el.style.overflowY = "auto";
    } else {
      el.style.height = el.scrollHeight + "px";
      el.style.overflowY = "hidden";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    if (tweet.trim() === "") {
      setError("Tweet content cannot be empty");
      return;
    }

    const tweetData = {
      userId: user.id,
      content: tweet.trim().toString(),
      media: "",
      likesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      retweetsCount: 0,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(tweetData),
      });

      if (!response.ok) {
        setError("Failed to create tweet");
        return;
      }

      const data = await response.json();
      console.log("Tweet created successfully:", data);

      if (data.status) {
        navigate("/");
      }

      // Clear the textarea after successful submission
      setTweet("");
    } catch (err) {
      setError(err.message || "An error occurred while creating the tweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-x-divider h-auto border-b px-4"
    >
      <div className="flex flex-1 items-start pt-4">
        <div>
          <div className="size-10 overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover object-center"
              src={MyImage}
              alt="profile-image"
            />
          </div>
        </div>

        <div className="h-auto w-full">
          <div className="px-1.5">
            <div className="h-auto">
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                onChange={(e) => setTweet(e.target.value)}
                value={tweet}
                className="text-x-bgOpposite custom-scrollbar w-full resize-none px-2 py-2 text-lg font-light outline-0"
                name="tweet"
                placeholder="What's happening?"
              ></textarea>
            </div>
            <div>
              <div className="text-x-blue-dark hover:bg-x-blue/10 mb-2 inline-flex items-center gap-2 rounded-full px-2 py-0.5">
                <span>
                  <Globe className="size-3.5 stroke-2" />
                </span>
                <span className="text-sm font-semibold">
                  Everyone can reply
                </span>
              </div>
            </div>
          </div>

          <div>
            {error && (
              <p className="mb-2 py-1.5 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="border-x-divider flex w-full items-center justify-between border-t py-2">
            <div className="flex gap-x-1.5">
              <button className="hover:bg-x-blue/10 inline-flex size-8 items-center justify-center rounded-full outline-0 transition-all duration-200">
                <label className="flex h-full w-full cursor-pointer items-center justify-center">
                  <input className="hidden" type="file" name="image" />
                  <Image className="text-x-blue-dark size-4.5 cursor-pointer" />
                </label>
              </button>
              <button className="hover:bg-x-blue/10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full outline-0 transition-all duration-200">
                <span>
                  <GiftIcon className="text-x-blue-dark size-4.5" />
                </span>
              </button>
              <button className="hover:bg-x-blue/10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full outline-0 transition-all duration-200">
                <span>
                  <ListTodoIcon className="text-x-blue-dark size-4.5" />
                </span>
              </button>
              <button className="hover:bg-x-blue/10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full outline-0 transition-all duration-200">
                <span>
                  <Smile className="text-x-blue-dark size-4.5" />
                </span>
              </button>
              <button className="hover:bg-x-blue/10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full outline-0 transition-all duration-200">
                <span>
                  <CalendarClock className="text-x-blue-dark size-4.5" />
                </span>
              </button>
              <button className="hover:bg-x-blue/10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full outline-0 transition-all duration-200">
                <span>
                  <MapPin className="text-x-blue-dark size-4.5" />
                </span>
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="bg-x-bgOpposite text-x-textOpposite cursor-pointer rounded-full px-4 py-1 font-medium outline-0 transition-all duration-200 active:scale-95"
              >
                {loading ? <Spinner /> : <span>Post</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTweet;
