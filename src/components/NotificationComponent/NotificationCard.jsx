import XLogo from "../../assets/logo/x-logo.svg";

const NotificationCard = () => {
  return (
    <div className="border-x-divider border-b px-4 py-2.5">
      <div className="flex w-full flex-1 items-start gap-6">
        <div>
          <img
            className="size-10 object-contain object-center"
            src={XLogo}
            alt="notification-icon"
          />
        </div>
        <div>
          <p className="text-xs leading-5 sm:text-sm">
            There was a login to your account @abrar_mahabub from a new device
            on Feb 11, 2026. Review it now.
            <span className="ml-2 inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 16 16"
                className="fill-x-text-light"
              >
                <circle cx="8" cy="8" r="6" />
              </svg>
              <span className="text-x-text-sec ml-1 text-[11px] sm:text-xs">
                Feb 11
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
