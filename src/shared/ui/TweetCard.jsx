import {
  BadgeCheck,
  BarChart2,
  Bookmark,
  Heart,
  MoreHorizontal,
  Repeat2,
} from "lucide-react";
import { Link } from "react-router";

const actionBaseClass =
  "group inline-flex items-center gap-1.5 rounded-full text-x-text-sec transition-colors duration-200";

function formatTweetTimestamp(createdAt) {
  if (!createdAt) {
    return "";
  }

  const parsedDate = new Date(createdAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return createdAt;
  }

  return parsedDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const TweetCard = ({
  userId,
  content,
  media,
  likesCount,
  viewsCount,
  retweetsCount,
  createdAt,
  user,
}) => {
  const {
    fullName = "Unknown User",
    username = "",
    profilePic = "",
  } = user ?? {};
  const authorHref = userId ? `/profile/${userId}` : null;
  const timestamp = formatTweetTimestamp(createdAt);

  return (
    <article className="border-x-divider hover:bg-x-surface/40 flex gap-3 border-b px-4 py-3 transition-colors duration-200">
      <div className="size-10 shrink-0 overflow-hidden rounded-full">
        <img
          className="h-full w-full object-cover object-center"
          src={
            profilePic
              ? profilePic
              : "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg"
          }
          alt={`${fullName} avatar`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[15px] leading-5">
              {authorHref ? (
                <Link to={authorHref}>
                  <span className="text-x-text truncate font-semibold">
                    {fullName}
                  </span>
                </Link>
              ) : (
                <span className="text-x-text truncate font-semibold">
                  {fullName}
                </span>
              )}
              <BadgeCheck className="fill-x-blue text-x-bg size-4" />
              {username && (
                <span className="text-x-text-sec truncate">@{username}</span>
              )}
              {timestamp && <span className="text-x-text-sec">,</span>}
              {timestamp && <span className="text-x-text-sec">{timestamp}</span>}
            </div>
          </div>

          <button className="hover:bg-x-surface inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200">
            <MoreHorizontal className="text-x-text-sec size-4" />
          </button>
        </div>

        <div className="mt-1.5 space-y-3">
          <p className="text-x-text text-[15px] leading-6 whitespace-pre-line">
            {content}
          </p>

          {media && (
            <div className="border-x-divider overflow-hidden rounded-2xl border">
              <img
                className="h-auto max-h-[32rem] w-full object-cover object-center"
                src={media}
                alt="tweet media"
              />
            </div>
          )}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2 text-sm">
          <button className={`${actionBaseClass} hover:text-x-green`}>
            <span className="group-hover:bg-x-green/10 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
              <Repeat2 className="size-4" />
            </span>
            <span>{retweetsCount}</span>
          </button>

          <button className={`${actionBaseClass} hover:text-x-red`}>
            <span className="group-hover:bg-x-red/10 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
              <Heart className="size-4" />
            </span>
            <span>{likesCount}</span>
          </button>

          <button className={`${actionBaseClass} hover:text-x-blue`}>
            <span className="group-hover:bg-x-blue/10 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
              <BarChart2 className="size-4" />
            </span>
            <span>{viewsCount}</span>
          </button>

          <div className="text-x-text-sec flex items-center justify-end gap-1">
            <button className="hover:text-x-blue">
              <span className="hover:bg-x-blue/10 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
                <Bookmark className="size-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetCard;
