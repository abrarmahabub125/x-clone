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
    "https://i.ibb.co.com/jZZHbNL5/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-f.jpg";

  return (
    <article className="border-x-divider hover:bg-x-surface/40 flex items-start gap-3 border-b px-4 py-4 transition-colors duration-200">
      <div
        className={`size-10 shrink-0 overflow-hidden rounded-full lg:size-11`}
      >
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
                <span className="text-x-text truncate text-sm font-semibold hover:underline lg:text-[15px] lg:font-bold">
                  {fullName}
                </span>
              </Link>
              {username && (
                <p className="text-x-text-sec text-xs lg:text-sm">
                  @{username}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <p className="text-x-text text-sm leading-6 lg:text-[15px]">{bio}</p>
        </div>
      </div>

      <div className="shrink-0">
        <FollowButton userId={userId} />
      </div>
    </article>
  );
};

export default FollowSuggestionCard;
