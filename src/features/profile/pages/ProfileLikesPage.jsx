import ProfileTimeline from "../components/ProfileTimeline";
import { likedPosts } from "../data/profileData";

const ProfileLikesPage = () => {
  return (
    <ProfileTimeline
      posts={likedPosts}
      emptyTitle="No likes yet"
      emptyDescription="Posts liked by this account will be listed here."
    />
  );
};

export default ProfileLikesPage;
