import MyPhoto from "../../assets/logo/my-photo.jpg";

const WhoToFollowCard = () => {
  return (
    <div className="flex w-full items-center justify-between gap-3 px-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="border-x-divider size-10 shrink-0 rounded-full border">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src={MyPhoto}
            alt="profile-image"
          />
        </div>
        <div className="min-w-0 flex flex-col justify-start">
          <span className="text-x-text truncate text-[15px] leading-5 font-bold transition-all duration-200 hover:underline">
            LeBron James
          </span>
          <span className="text-x-text-sec text-[13px]">@kingJames</span>
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
