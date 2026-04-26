import { useState } from "react";
import ProfileTimeline from "../components/ProfileTimeline";

const ProfileRepliesPage = () => {
  const [replies, setReplies] = useState([]);
  return (
    <ProfileTimeline
      posts={replies}
      emptyTitle="No replies yet"
      emptyDescription="Replies and conversations from this account will show up here."
    />
  );
};

export default ProfileRepliesPage;
