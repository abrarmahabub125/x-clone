import ProfileTimeline from "../components/ProfileTimeline";
import { profileReplies } from "../data/profileData";

const ProfileRepliesPage = () => {
  return (
    <ProfileTimeline
      posts={profileReplies}
      emptyTitle="No replies yet"
      emptyDescription="Replies and conversations from this account will show up here."
    />
  );
};

export default ProfileRepliesPage;
