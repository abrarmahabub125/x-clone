import { BadgeCheck, MoreHorizontal } from "lucide-react";

const FollowSuggestionCard = ({
  avatar,
  name,
  handle,
  bio,
  followers,
  verified = false,
  badge,
  compact = false,
}) => {
  return (
    <article className="border-x-divider flex items-start gap-3 border-b px-4 py-4 transition-colors duration-200 hover:bg-x-surface/40">
      <div className={`${compact ? "size-10" : "size-12"} shrink-0 overflow-hidden rounded-full`}>
        <img
          className="h-full w-full object-cover object-center"
          src={avatar}
          alt={`${name} avatar`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <span className="truncate text-[15px] font-bold text-x-text hover:underline">
                {name}
              </span>
              {verified && <BadgeCheck className="size-4 fill-x-blue text-x-bg" />}
            </div>
            <p className="text-x-text-sec text-sm">@{handle}</p>
            {badge && (
              <p className="text-x-text-sec mt-1 text-xs font-medium uppercase tracking-wide">
                {badge}
              </p>
            )}
          </div>

          <button className="hover:bg-x-surface -mr-2 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
            <MoreHorizontal className="size-4 text-x-text-sec" />
          </button>
        </div>

        <div className="mt-2 space-y-2">
          <p className="text-x-text text-[15px] leading-6">{bio}</p>
          <p className="text-x-text-sec text-sm">{followers} Followers</p>
        </div>
      </div>

      <div className="shrink-0">
        <button className="bg-x-bgOpposite text-x-textOpposite rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95">
          Follow
        </button>
      </div>
    </article>
  );
};

export default FollowSuggestionCard;
