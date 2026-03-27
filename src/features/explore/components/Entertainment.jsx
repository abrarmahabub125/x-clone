import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import ExploreHeroCard from "./ExploreHeroCard";
import ExploreSectionHeader from "./ExploreSectionHeader";
import ExploreTopicCard from "./ExploreTopicCard";

const entertainmentTopics = [
  {
    category: "Entertainment · Trending",
    title: "Streaming releases",
    meta: "New season drops, fan theories, and episode reactions are moving fast.",
    posts: "27.9K",
    image: MyPhoto,
  },
  {
    category: "Music",
    title: "Album rollout visuals",
    meta: "People are discussing cover art direction, teaser pacing, and performance clips.",
    posts: "15.4K",
  },
  {
    category: "Film",
    title: "Cinematic worldbuilding",
    meta: "Audiences are talking about atmosphere, color, and practical set design.",
    posts: "10.1K",
    image: MyPhoto,
  },
];

const Entertainment = () => {
  return (
    <div>
      <ExploreHeroCard
        eyebrow="Entertainment"
        title="Big visuals, fan reactions, and the stories shaping pop culture"
        description="From streaming premieres to music rollouts, people are gathering around the moments that feel cinematic and immediate."
        image={MyPhoto}
        meta="Entertainment · Updated throughout the day"
      />

      <ExploreSectionHeader
        title="Popular now"
        subtitle="The conversations taking over entertainment feeds"
      />

      {entertainmentTopics.map((topic) => (
        <ExploreTopicCard key={topic.title} {...topic} />
      ))}
    </div>
  );
};

export default Entertainment;
