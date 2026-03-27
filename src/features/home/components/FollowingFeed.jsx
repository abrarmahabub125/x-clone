import TweetCard from "../../../shared/ui/TweetCard";
import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";

const followingTweets = [
  {
    id: 1,
    author: "Design Daily",
    handle: "design_daily",
    time: "38m",
    content:
      "A great feed card should feel quiet. Strong spacing, low visual noise, and clear hierarchy do most of the work.",
    avatar: MyPhoto,
    replies: 11,
    reposts: 29,
    likes: 341,
    views: "22K",
  },
  {
    id: 2,
    author: "React Bangladesh",
    handle: "react_bd",
    time: "4h",
    content:
      "If you want a more production-ready frontend, make your primitives reusable first. Buttons, headers, cards, tabs. Everything gets easier after that.",
    avatar: MyPhoto,
    verified: true,
    replies: 8,
    reposts: 14,
    likes: 129,
    views: "7.1K",
  },
];

const FollowingFeed = () => {
  return (
    <div>
      {followingTweets.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet} />
      ))}
    </div>
  );
};

export default FollowingFeed;
