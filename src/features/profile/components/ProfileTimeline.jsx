import { useEffect, useState } from "react";
import TweetCard from "../../../shared/ui/TweetCard";
import {
  removeTweetById,
  updateTweetById,
} from "../../../shared/utils/tweetListState";

function normalizeProfilePost(post) {
  return {
    _id: post._id ?? post.id,
    userId: post.userId ?? "",
    content: post.content ?? "",
    media: post.media ?? post.image ?? "",
    likesCount: post.likesCount ?? post.likes ?? 0,
    viewsCount: post.viewsCount ?? post.views ?? 0,
    retweetsCount: post.retweetsCount ?? post.reposts ?? 0,
    createdAt: post.createdAt ?? post.time ?? "",
    isLiked: Boolean(post.isLiked),
    isBookmarked: Boolean(post.isBookmarked),
    user: post.user ?? {
      fullName: post.author ?? "Unknown User",
      username: post.handle ?? "",
      profilePic: post.avatar ?? "",
    },
  };
}

const ProfileTimeline = ({
  posts = [],
  emptyTitle = "No posts yet",
  emptyDescription = "Share your first post and start engaging.",
  removeOnUnlike = false,
}) => {
  const [timelinePosts, setTimelinePosts] = useState(() =>
    posts.map(normalizeProfilePost),
  );

  useEffect(() => {
    setTimelinePosts(posts.map(normalizeProfilePost));
  }, [posts]);

  const handleLikeChange = (tweetId, change) => {
    setTimelinePosts((currentPosts) => {
      if (removeOnUnlike && change.previousIsLiked && !change.isLiked) {
        return removeTweetById(currentPosts, tweetId);
      }

      return updateTweetById(currentPosts, tweetId, {
        isLiked: change.isLiked,
        likesCount: change.likesCount,
      });
    });
  };

  const handleBookmarkChange = (tweetId, nextIsBookmarked) => {
    setTimelinePosts((currentPosts) =>
      updateTweetById(currentPosts, tweetId, {
        isBookmarked: nextIsBookmarked,
      }),
    );
  };

  if (!timelinePosts.length) {
    return (
      <div className="px-6 py-12">
        <div className="mx-auto max-w-sm space-y-2 text-center">
          <h3 className="text-x-text text-2xl font-extrabold">{emptyTitle}</h3>
          <p className="text-x-text-sec text-sm leading-6">
            {emptyDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {timelinePosts.map((post) => (
        <TweetCard
          key={post._id}
          {...post}
          onLikeChange={handleLikeChange}
          onBookmarkChange={handleBookmarkChange}
        />
      ))}
    </div>
  );
};

export default ProfileTimeline;
