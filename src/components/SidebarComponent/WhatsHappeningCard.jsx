import { EllipsisIcon } from "lucide-react";

const WhatsHappeningCard = () => {
  return (
    <div className="flex w-full items-center justify-between px-4">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-1.5">
            <span className="text-x-text-sec text-xs font-light">
              Love Island UK
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              viewBox="0 0 16 16"
              className="fill-x-text-light"
            >
              <circle cx="8" cy="8" r="6" fill="" />
            </svg>
            <span className="text-x-text-sec text-xs font-light">Trending</span>
          </div>
          <div>
            <button className="hover:bg-x-surface flex size-6 cursor-pointer items-center justify-center rounded-full outline-0 transition-colors duration-200">
              <EllipsisIcon className="text-x-text size-4" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-x-text text-base leading-5 font-medium">
            #LoveIslandAllStars
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsHappeningCard;
