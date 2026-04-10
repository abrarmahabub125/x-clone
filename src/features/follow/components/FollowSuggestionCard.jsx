import { Link } from "react-router";
import FollowButton from "../../../shared/ui/FollowButton";

const FollowSuggestionCard = ({
  userId,
  fullName,
  profilePic,
  username,
  bio,
}) => {
  const avatar =
    profilePic ||
    "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg";

  return (
    <article className="border-x-divider hover:bg-x-surface/40 flex items-start gap-3 border-b px-4 py-4 transition-colors duration-200">
      <div className={`size-11 shrink-0 overflow-hidden rounded-full`}>
        <img
          className="h-full w-full object-cover object-center"
          src={avatar}
          alt={`${fullName} avatar`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col justify-start gap-y-0.5">
              <Link to={`/profile/${userId}`}>
                <span className="text-x-text truncate text-[15px] font-bold hover:underline">
                  {fullName}
                </span>
              </Link>
              {username && (
                <p className="text-x-text-sec text-sm">@{username}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <p className="text-x-text text-[15px] leading-6">{bio}</p>
        </div>
      </div>

      <div className="shrink-0">
        <FollowButton userId={userId} />
      </div>
    </article>
  );
};

export default FollowSuggestionCard;
