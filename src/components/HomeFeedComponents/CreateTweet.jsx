import {
  CalendarClock,
  GiftIcon,
  Globe,
  Image,
  ListTodoIcon,
  MapPin,
  Smile,
} from "lucide-react";
import MyImage from "../../assets/logo/my-photo.jpg";
import { useRef } from "react";

const CreateTweet = () => {
  const textareaRef = useRef(null);

  const MAX_HEIGHT = 200;

  const handleInput = () => {
    const el = textareaRef.current;

    el.style.height = "auto"; // reset

    if (el.scrollHeight > MAX_HEIGHT) {
      el.style.height = MAX_HEIGHT + "px";
      el.style.overflowY = "auto";
    } else {
      el.style.height = el.scrollHeight + "px";
      el.style.overflowY = "hidden";
    }
  };

  return (
    <form className="border-x-divider h-auto border-b px-4">
      <div className="flex flex-1 items-start pt-4">
        {/* profile image  */}
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
          {/* Text section  */}
          <div className="px-1.5">
            <div className="h-auto">
              <textarea
                ref={textareaRef}
                onInput={handleInput}
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

          {/* Input section  */}
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
              <button className="bg-x-bgOpposite text-x-textOpposite cursor-pointer rounded-full px-4 py-1 font-medium outline-0 transition-all duration-200 active:scale-95">
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTweet;
