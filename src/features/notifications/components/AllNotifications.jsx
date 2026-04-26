import NotificationCard from "./NotificationCard";

const notifications = [];

const AllNotifications = () => {
  return (
    <div className="flex min-h-fit w-full flex-col justify-start">
      {notifications.length === 0 && (
        <div className="text-x-text-sec flex h-20 w-full items-center justify-center text-xs md:text-sm lg:text-base">
          No notifications yet.
        </div>
      )}
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} {...notification} />
      ))}
    </div>
  );
};

export default AllNotifications;
