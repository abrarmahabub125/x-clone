import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import ExploreSectionHeader from "./ExploreSectionHeader";
import ExploreTopicCard from "./ExploreTopicCard";

const trendingTopics = [
  {
    category: "Trending in Bangladesh",
    title: "Frontend Architecture",
    meta: "Developers are sharing better folder structures and reusable UI patterns.",
    posts: "28.1K",
  },
  {
    category: "Trending in Technology",
    title: "Vite + React",
    meta: "Fast local iteration and simpler project setup keep this topic moving.",
    posts: "41.8K",
    image: MyPhoto,
  },
  {
    category: "Trending",
    title: "Tailwind v4",
    meta: "People are comparing utility workflows, theme tokens, and production DX.",
    posts: "16.2K",
  },
  {
    category: "Trending in Design",
    title: "Dark borders on light UI",
    meta: "Subtle dividers and stronger hierarchy are back in interface design.",
    posts: "6,902",
    image: MyPhoto,
  },
  {
    category: "Trending in Startups",
    title: "Polished MVPs",
    meta: "More founders are prioritizing feel and usability before feature count.",
    posts: "12.3K",
  },
];

const Trending = () => {
  return (
    <div>
      <ExploreSectionHeader
        title="Trending"
        subtitle="What people are talking about right now"
      />
      {trendingTopics.map((topic) => (
        <ExploreTopicCard key={topic.title} {...topic} />
      ))}
    </div>
  );
};

export default Trending;
