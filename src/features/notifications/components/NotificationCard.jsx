import { AtSign, Heart, MessageCircle, Repeat2, UserRoundPlus } from "lucide-react";
import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";

const notificationIcons = {
  like: Heart,
  repost: Repeat2,
  follow: UserRoundPlus,
  mention: AtSign,
  reply: MessageCircle,
};

const notificationStyles = {
  like: "text-x-red",
  repost: "text-x-green",
  follow: "text-x-blue",
  mention: "text-x-blue",
  reply: "text-x-blue",
};

const NotificationCard = ({
  type = "like",
  actor = "Someone",
  handle = "someone",
  text,
  time = "Just now",
  secondaryText,
}) => {
  const Icon = notificationIcons[type] || Heart;
  const iconClassName = notificationStyles[type] || "text-x-blue";

  return (
    <article className="border-x-divider flex gap-3 border-b px-4 py-4 transition-colors duration-200 hover:bg-x-surface/40">
      <div className="flex w-9 shrink-0 justify-center pt-1">
        <Icon className={`size-7 ${iconClassName}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="size-10 overflow-hidden rounded-full">
          <img
            className="h-full w-full object-cover object-center"
            src={MyPhoto}
            alt={`${actor} avatar`}
          />
        </div>

        <div className="mt-3 space-y-1.5">
          <p className="text-x-text text-[15px] leading-6">
            <span className="font-bold">{actor}</span>
            <span className="text-x-text-sec"> @{handle}</span>
            <span className="text-x-text-sec"> · {time}</span>
          </p>

          <p className="text-x-text text-[15px] leading-6">{text}</p>

          {secondaryText && (
            <p className="text-x-text-sec text-[15px] leading-6">
              {secondaryText}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default NotificationCard;
