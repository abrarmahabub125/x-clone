import MyPhoto from "../../assets/logo/my-photo.jpg";
const WhoToFollowCard = () => {
  return (
    <div className="flex w-full items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="border-x-divider size-10 rounded-full border">
          <img
            className="h-full w-full rounded-full"
            src={MyPhoto}
            alt="profile-image"
          />
        </div>
        <div className="flex flex-col justify-start">
          <span className="text-x-text text-base leading-5 font-medium transition-all duration-200 hover:underline">
            LeBorn James
          </span>
          <span className="text-x-text-sec text-sm font-light">@kingJames</span>
        </div>
      </div>
      <div>
        <button className="bg-x-bgOpposite text-x-textOpposite cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-all hover:opacity-95 active:scale-95">
          Follow
        </button>
      </div>
    </div>
  );
};

export default WhoToFollowCard;
