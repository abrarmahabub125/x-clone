import NotificationCard from "./NotificationCard";

const AllNotifications = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-start">
      <NotificationCard />
      <NotificationCard />
    </div>
  );
};

export default AllNotifications;
