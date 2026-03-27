import TweetCard from "../../../shared/ui/TweetCard";
import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";

const tweets = [
  {
    id: 1,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "2h",
    content:
      "Just finished another cleanup pass on the X clone. Small layout decisions really change how premium a feed feels.",
    avatar: MyPhoto,
    verified: true,
    replies: 24,
    reposts: 12,
    likes: 186,
    views: "9.8K",
  },
  {
    id: 2,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "6h",
    content:
      "Working on reusable tweet cards, profile polish, and route consistency today.\n\nTrying to keep the app close to X while still keeping the codebase organized.",
    avatar: MyPhoto,
    verified: true,
    image: MyPhoto,
    replies: 31,
    reposts: 17,
    likes: 298,
    views: "14.2K",
  },
];

const NewsFeed = () => {
  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet} />
      ))}
    </div>
  );
};

export default NewsFeed;
