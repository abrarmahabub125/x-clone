import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import ExploreSectionHeader from "./ExploreSectionHeader";
import ExploreTopicCard from "./ExploreTopicCard";

const sportsTopics = [
  {
    category: "Sports · Trending",
    title: "Football tactics boards",
    meta: "Fans are breaking down shape changes, transitions, and match tempo in real time.",
    posts: "52.2K",
    image: MyPhoto,
  },
  {
    category: "Basketball · Trending",
    title: "Clutch-time shot creation",
    meta: "Late-game possessions and decision-making are dominating discussion.",
    posts: "19.7K",
  },
  {
    category: "Cricket · Trending in Bangladesh",
    title: "Powerplay strategy",
    meta: "Selections, field settings, and early momentum are all under review.",
    posts: "14.5K",
    image: MyPhoto,
  },
  {
    category: "Combat sports",
    title: "Fight week reactions",
    meta: "Training clips, press conference moments, and bold predictions are everywhere.",
    posts: "7,812",
  },
];

const Sports = () => {
  return (
    <div>
      <ExploreSectionHeader
        title="Sports"
        subtitle="Live topics from the games, highlights, and fan conversations"
      />
      {sportsTopics.map((topic) => (
        <ExploreTopicCard key={topic.title} {...topic} />
      ))}
    </div>
  );
};

export default Sports;
