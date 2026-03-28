import ProfileTimeline from "../components/ProfileTimeline";
import { profilePosts } from "../data/profileData";

const ProfilePostsPage = () => {
  return <ProfileTimeline posts={profilePosts} />;
};

export default ProfilePostsPage;
