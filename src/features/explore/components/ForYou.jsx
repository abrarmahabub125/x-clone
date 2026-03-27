import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import ExploreHeroCard from "./ExploreHeroCard";
import ExploreSectionHeader from "./ExploreSectionHeader";
import ExploreTopicCard from "./ExploreTopicCard";

const topics = [
  {
    category: "Trending in Technology",
    title: "React 19 patterns",
    meta: "Developers are discussing compiler-friendly component structure and cleaner UI architecture.",
    posts: "32.4K",
    image: MyPhoto,
  },
  {
    category: "Trending in Bangladesh",
    title: "Remote frontend jobs",
    meta: "Design systems, portfolio quality, and clean React structure are leading the conversation.",
    posts: "18.7K",
  },
  {
    category: "UI Design · Trending",
    title: "Micro-interactions",
    meta: "Teams are focusing less on flashy animation and more on clarity, rhythm, and motion restraint.",
    posts: "9,842",
    image: MyPhoto,
  },
  {
    category: "Business & tech · Trending",
    title: "Product polish",
    meta: "People are comparing apps that feel fast and finished against ones that still feel template-based.",
    posts: "11.2K",
  },
];

const ForYou = () => {
  return (
    <div>
      <ExploreHeroCard
        eyebrow="For you"
        title="Designing calmer, denser, more readable social feeds"
        description="A closer look at how spacing, hierarchy, and content rhythm shape the experience of modern social products."
        image={MyPhoto}
        meta="Trending with frontend developers and product designers"
      />

      <ExploreSectionHeader
        title="Trends for you"
        subtitle="Picked based on design, product, and frontend conversations"
      />

      <div>
        {topics.map((topic) => (
          <ExploreTopicCard key={topic.title} {...topic} />
        ))}
      </div>
    </div>
  );
};

export default ForYou;
