import { useEffect, useState, useCallback } from "react";
import { fetcher } from "../../../fetcher";
import {
  fetchFollowStatus,
  getFollowStatus,
  setFollowStatus,
  subscribeFollowStatus,
  unsubscribeFollowStatus,
} from "./followStatusStore";
import toast from "react-hot-toast";

const FollowButton = ({
  userId,
  styles = "text-sm lg:text-base h-8 px-4 lg:h-9 lg:px-5",
}) => {
  const [isFollowing, setFollowing] = useState(() => getFollowStatus(userId));
  const [isProcessing, setProcessing] = useState(false);

  useEffect(() => {
    setFollowing(getFollowStatus(userId));
    subscribeFollowStatus(userId, setFollowing);

    if (getFollowStatus(userId) === null) {
      fetchFollowStatus(userId).catch(() => {
        // Keep existing state if fetch fails; no flash update.
      });
    }

    return () => unsubscribeFollowStatus(userId, setFollowing);
  }, [userId]);

  const handleFollow = useCallback(async () => {
    if (isProcessing || isFollowing === null) return;

    const nextState = !isFollowing;
    const prevState = isFollowing;

    setProcessing(true);
    setFollowStatus(userId, nextState);

    try {
      if (prevState) {
        await fetcher(`/api/users/${userId}/unfollow`, {
          method: "DELETE",
        });
      } else {
        await fetcher(`/api/users/${userId}/follow`, {
          method: "POST",
        });
      }

      setFollowStatus(userId, nextState);
    } catch (err) {
      setFollowStatus(userId, prevState);
      toast.error(err.message || "You can't follow yourself.");
    } finally {
      setProcessing(false);
    }
  }, [isFollowing, isProcessing, userId]);

  const buttonLabel =
    isFollowing === null ? "Follow" : isFollowing ? "Following" : "Follow";
  const buttonClasses = `${styles} ${isFollowing ? "text-x-text border-x-divider border bg-transparent" : "text-x-textOpposite bg-x-bgOpposite"} cursor-pointer rounded-full font-medium transition hover:opacity-95 active:scale-98 ${isProcessing ? "opacity-70 pointer-events-none" : ""}`;

  return (
    <button
      onClick={handleFollow}
      className={buttonClasses}
      disabled={isProcessing || isFollowing === null}
    >
      {buttonLabel}
    </button>
  );
};

export default FollowButton;
