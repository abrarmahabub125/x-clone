import { Link } from "react-router";
import MyPhoto from "../../assets/logo/my-photo.jpg";

const WhoToFollowCard = ({ userId, fullName, username, profilePic }) => {
  const avatarUrl = profilePic
    ? profilePic
    : "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg";
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
          <Link to={`/profile/${userId}`}>
            <span className="text-x-text truncate text-[15px] leading-5 font-bold transition-all duration-200 hover:underline">
              {fullName}
            </span>
          </Link>
          {username && (
            <span className="text-x-text-sec text-[13px]">{username}</span>
          )}
        </div>
      </div>
      <div>
        <button className="bg-x-bgOpposite text-x-textOpposite cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-bold transition-all hover:opacity-95 active:scale-95">
          Follow
        </button>
      </div>
    </div>
  );
};

export default WhoToFollowCard;
