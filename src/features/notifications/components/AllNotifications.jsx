import NotificationCard from "./NotificationCard";

const notifications = [
  {
    id: 1,
    type: "follow",
    actor: "Sara UI",
    handle: "sara_designs",
    time: "2m",
    text: "followed you.",
  },
  {
    id: 2,
    type: "like",
    actor: "Maya Creates",
    handle: "maya_creates",
    time: "18m",
    text: "liked your post about building cleaner reusable components.",
  },
  {
    id: 3,
    type: "repost",
    actor: "React Bangladesh",
    handle: "react_bd",
    time: "1h",
    text: "reposted your post.",
    secondaryText:
      "Working on reusable tweet cards, profile polish, and route consistency today.",
  },
  {
    id: 4,
    type: "reply",
    actor: "Farhan Codes",
    handle: "farhanbuilds",
    time: "3h",
    text: "replied to your post: \"This structure looks much cleaner now.\"",
  },
];

const AllNotifications = () => {
  return (
    <div className="flex min-h-fit w-full flex-col justify-start">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} {...notification} />
      ))}
    </div>
  );
};

export default AllNotifications;
