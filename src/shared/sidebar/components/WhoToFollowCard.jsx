import { Link } from "react-router";
import { BadgeCheck } from "lucide-react";
import FollowButton from "../../ui/FollowButton";

const WhoToFollowCard = ({ userId, fullName, username, profilePic }) => {
  const avatarUrl = profilePic
    ? profilePic
    : "https://i.ibb.co.com/jZZHbNL5/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-f.jpg";
  return (
    <div className="flex w-full items-center justify-between gap-3 px-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="border-x-divider size-10 shrink-0 rounded-full border">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src={avatarUrl}
            alt={`${fullName} profile`}
          />
        </div>
        <div className="flex min-w-0 flex-col justify-start">
          <Link className="flex items-center gap-1" to={`/profile/${userId}`}>
            <span className="text-x-text truncate text-[15px] leading-5 font-bold transition-all duration-200 hover:underline">
              {fullName}
            </span>
            <BadgeCheck className="fill-x-blue text-x-bg size-4" />
          </Link>
          {username && (
            <span className="text-x-text-sec text-[13px]">{username}</span>
          )}
        </div>
      </div>
      <div>
        <FollowButton userId={userId} styles={"px-4 py-1.5 text-sm"} />
      </div>
    </div>
  );
};

export default WhoToFollowCard;
