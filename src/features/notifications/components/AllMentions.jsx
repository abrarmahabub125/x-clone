import NotificationCard from "./NotificationCard";

const mentions = [
  {
    id: 1,
    type: "mention",
    actor: "Design Daily",
    handle: "design_daily",
    time: "12m",
    text:
      "mentioned you: \"@abrar_mahabub this X clone layout polish is getting really close.\"",
  },
  {
    id: 2,
    type: "mention",
    actor: "Nadia Visuals",
    handle: "nadiavisuals",
    time: "2h",
    text:
      "mentioned you in a conversation about profile page spacing and content density.",
    secondaryText:
      "They called out your header and card improvements specifically.",
  },
];

const AllMentions = () => {
  return (
    <div className="flex min-h-fit w-full flex-col justify-start">
      {mentions.map((mention) => (
        <NotificationCard key={mention.id} {...mention} />
      ))}
    </div>
  );
};

export default AllMentions;
