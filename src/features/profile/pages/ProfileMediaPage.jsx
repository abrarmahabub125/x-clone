import ProfileTimeline from "../components/ProfileTimeline";
import { profileMedia } from "../data/profileData";

const ProfileMediaPage = () => {
  return (
    <ProfileTimeline
      posts={profileMedia}
      emptyTitle="Lights, camera ... attachments"
      emptyDescription="Photos and videos shared from this account will appear here."
    />
  );
};

export default ProfileMediaPage;
