import TweetCard from "../../../shared/ui/TweetCard";

const ProfileTimeline = ({
  posts,
  emptyTitle = "No posts yet",
  emptyDescription = "When posts show up, you'll see them here.",
}) => {
  if (!posts.length) {
    return (
      <div className="border-x-divider border-b px-6 py-12">
        <div className="mx-auto max-w-sm space-y-2 text-center">
          <h3 className="text-x-text text-2xl font-extrabold">{emptyTitle}</h3>
          <p className="text-x-text-sec text-sm leading-6">{emptyDescription}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <TweetCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default ProfileTimeline;
