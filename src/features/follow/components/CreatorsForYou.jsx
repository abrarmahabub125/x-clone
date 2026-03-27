import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";

const creators = [
  {
    id: 1,
    name: "Maya Creates",
    handle: "maya_creates",
    bio: "Posting detailed UI teardown threads, app redesign notes, and modern web inspiration every day.",
    followers: "311K",
    verified: true,
    badge: "UI creator",
    avatar: MyPhoto,
  },
  {
    id: 2,
    name: "Farhan Codes",
    handle: "farhanbuilds",
    bio: "Sharing React architecture, clean component systems, and practical frontend engineering lessons.",
    followers: "96.4K",
    verified: true,
    badge: "Developer creator",
    avatar: MyPhoto,
  },
  {
    id: 3,
    name: "Nadia Visuals",
    handle: "nadiavisuals",
    bio: "Creative direction, interface storytelling, and motion studies for product teams that care about feel.",
    followers: "144K",
    badge: "Design creator",
    avatar: MyPhoto,
  },
  {
    id: 4,
    name: "Build In Public",
    handle: "buildinpublic",
    bio: "Founders, makers, and designers documenting process, decisions, and launches in real time.",
    followers: "72.8K",
    badge: "Startup creator",
    avatar: MyPhoto,
  },
];

const CreatorsForYou = () => {
  return (
    <div>
      <FollowSectionHeader
        title="Creators for you"
        subtitle="Popular creators in design, frontend, and product conversations"
      />

      <div>
        {creators.map((creator) => (
          <FollowSuggestionCard key={creator.id} {...creator} />
        ))}
      </div>
    </div>
  );
};

export default CreatorsForYou;
