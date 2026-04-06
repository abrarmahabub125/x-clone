import TweetCard from "../../../shared/ui/TweetCard";

const ProfileTimeline = ({ posts }) => {
  if (!posts.length) {
    return (
      <div className="px-6 py-12">
        <div className="mx-auto max-w-sm space-y-2 text-center">
          <h3 className="text-x-text text-2xl font-extrabold">No posts yet</h3>
          <p className="text-x-text-sec text-sm leading-6">
            Share your first post and start engaging.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <TweetCard key={post._id} {...post} />
      ))}
    </div>
  );
};

export default ProfileTimeline;
