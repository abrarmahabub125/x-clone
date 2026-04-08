import TweetCard from "../../../shared/ui/TweetCard";

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
}) => {
  const normalizedPosts = posts.map(normalizeProfilePost);

  if (!normalizedPosts.length) {
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
      {normalizedPosts.map((post) => (
        <TweetCard key={post._id} {...post} />
      ))}
    </div>
  );
};

export default ProfileTimeline;
