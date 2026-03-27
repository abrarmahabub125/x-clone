import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";

const suggestions = [
  {
    id: 1,
    name: "LeBron James",
    handle: "kingjames",
    bio: "Still chasing greatness. Athlete. Storyteller. Investor. Family first.",
    followers: "52.1M",
    verified: true,
    avatar: MyPhoto,
  },
  {
    id: 2,
    name: "Sara UI",
    handle: "sara_designs",
    bio: "Designing interfaces that feel lighter, faster, and more human. Product design threads every week.",
    followers: "84.5K",
    verified: true,
    avatar: MyPhoto,
  },
  {
    id: 3,
    name: "React Bangladesh",
    handle: "react_bd",
    bio: "Community account sharing React resources, frontend jobs, and real-world architecture ideas.",
    followers: "18.2K",
    avatar: MyPhoto,
  },
  {
    id: 4,
    name: "Product Hunt Daily",
    handle: "ph_daily",
    bio: "Surfacing the most interesting launches, design experiments, and startup tools every day.",
    followers: "209K",
    verified: true,
    avatar: MyPhoto,
  },
];

const FollowHome = () => {
  return (
    <div>
      <FollowSectionHeader
        title="Suggested for you"
        subtitle="Accounts you might want to follow based on product, design, and frontend interests"
      />

      <div>
        {suggestions.map((profile) => (
          <FollowSuggestionCard key={profile.id} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default FollowHome;
