import WhoToFollowCard from "./WhoToFollowCard";

const WhoToFollow = () => {
  return (
    <div>
      <div>
        <div className="px-4 py-3">
          <div>
            <span className="text-x-text text-xl font-extrabold">Who to follow</span>
          </div>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-y-4 pb-3">
        <WhoToFollowCard />
        <WhoToFollowCard />
        <WhoToFollowCard />
        <WhoToFollowCard />
      </div>
    </div>
  );
};

export default WhoToFollow;
