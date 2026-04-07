import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import ExploreHeroCard from "./ExploreHeroCard";
import ExploreSectionHeader from "./ExploreSectionHeader";
import ExploreTopicCard from "./ExploreTopicCard";

const stories = [
  {
    category: "Technology � LIVE",
    title:
      "Teams are rebuilding profile and feed experiences with cleaner primitives",
    meta: "Reusable cards, stable routes, and consistent headers are at the center of today's frontend discussions.",
    posts: "24.6K",
    image: MyPhoto,
  },
  {
    category: "World news",
    title: "Remote-first product teams keep investing in frontend polish",
    meta: "Shipping fast still matters, but visual trust and usability are driving more roadmap decisions.",
    posts: "13.1K",
  },
  {
    category: "Tech culture",
    title: "Design systems are getting smaller and more intentional",
    meta: "Fewer primitives, stronger defaults, better outcomes.",
    posts: "8,409",
    image: MyPhoto,
  },
];

const News = () => {
  return (
    <div>
      <ExploreHeroCard
        eyebrow="News"
        title="Frontend teams are putting visual clarity back at the center"
        description="Across products, teams are investing in stronger card design, more readable layouts, and systems that scale without feeling generic."
        image={MyPhoto}
        meta="Technology � 18K posts"
      />

      <ExploreSectionHeader
        title="Latest stories"
        subtitle="Big topics moving across product, design, and engineering"
      />

      {stories.map((story) => (
        <ExploreTopicCard key={story.title} {...story} />
      ))}
    </div>
  );
};

export default News;
