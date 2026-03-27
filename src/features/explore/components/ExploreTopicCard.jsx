import { MoreHorizontal } from "lucide-react";

const ExploreTopicCard = ({ category, title, posts, meta, image, verified = false }) => {
  return (
    <article className="border-x-divider flex items-start gap-3 border-b px-4 py-3 transition-colors duration-200 hover:bg-x-surface/40">
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-x-text-sec text-xs sm:text-sm">{category}</p>
            <h3 className="text-x-text mt-0.5 text-[15px] leading-5 font-bold sm:text-base">
              {title}
              {verified && <span className="text-x-blue ml-1 align-middle">•</span>}
            </h3>
            {meta && <p className="text-x-text-sec mt-1 text-sm leading-5">{meta}</p>}
            <p className="text-x-text-sec mt-1 text-xs sm:text-sm">{posts} posts</p>
          </div>

          <button className="hover:bg-x-surface -mr-2 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
            <MoreHorizontal className="size-4 text-x-text-sec" />
          </button>
        </div>
      </div>

      {image && (
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
          <img
            className="h-full w-full object-cover object-center"
            src={image}
            alt={title}
          />
        </div>
      )}
    </article>
  );
};

export default ExploreTopicCard;
