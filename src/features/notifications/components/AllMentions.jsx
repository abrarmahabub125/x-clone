import NotificationCard from "./NotificationCard";

const mentions = [];

const AllMentions = () => {
  return (
    <div className="flex min-h-fit w-full flex-col justify-start">
      {mentions.length === 0 && (
        <div className="text-x-text-sec flex h-20 w-full items-center justify-center text-xs md:text-sm lg:text-base">
          No mentions yet.
        </div>
      )}
      {mentions.map((mention) => (
        <NotificationCard key={mention.id} {...mention} />
      ))}
    </div>
  );
};

export default AllMentions;
