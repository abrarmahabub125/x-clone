import MyImage from "../../assets/logo/my-photo.jpg";

const TodayNewsCard = () => {
  return (
    <div>
      <div>
        <p className="text-x-text text-base leading-5 font-medium">
          Bayes' Theorem Breakdown Draws Thousands to Rationality Debate.
        </p>
      </div>
      <div className="mt-2 flex items-center gap-x-2">
        <div className="flex items-center">
          <div className="border-x-surface relative h-fit w-fit rounded-full border">
            <img
              className="z-30 size-5 rounded-full object-cover object-center"
              src={MyImage}
              alt="user_image"
            />
          </div>
          <div className="border-x-surface relative -ml-1.5 h-fit w-fit rounded-full border">
            <img
              className="z-20 size-5 rounded-full object-cover object-center"
              src={MyImage}
              alt="user_image"
            />
          </div>
          <div className="border-x-surface relative -ml-1.5 h-fit w-fit rounded-full border">
            <img
              className="z-10 size-5 rounded-full object-cover object-center"
              src={MyImage}
              alt="user_image"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-x-text-sec text-xs font-light">6h ago</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              viewBox="0 0 16 16"
              className="fill-x-text-light"
            >
              <circle cx="8" cy="8" r="6" fill="" />
            </svg>
            <span className="text-x-text-sec text-xs font-light sm:text-sm lg:text-base">
              Others
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
            <span className="text-x-text-sec text-xs font-light">
              355 posts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayNewsCard;
