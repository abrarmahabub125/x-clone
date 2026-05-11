import { useState } from "react";
import { useOutletContext } from "react-router";
import ProfileTimeline from "../components/ProfileTimeline";

const ProfileRepliesPage = () => {
  const [replies, setReplies] = useState([]);
  const { onOwnPostDeleted } = useOutletContext();
  return (
    <ProfileTimeline
      posts={replies}
      emptyTitle="No replies yet"
      emptyDescription="Replies and conversations from this account will show up here."
      onDeletePost={onOwnPostDeleted}
    />
  );
};

export default ProfileRepliesPage;
