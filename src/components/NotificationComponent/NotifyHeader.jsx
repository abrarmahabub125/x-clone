import TabItem from "../ReusedComponents/TabItem";
import SettingIcon from "../ReusedComponents/SettingIcon";

const NotifyHeader = () => {
  const tabs = [
    {
      label: "All",
      path: "/notifications",
    },
    {
      label: "Mentions",
      path: "/notifications/mentions",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <span className="text-x-text text-lg font-semibold sm:text-xl">
            Notifications
          </span>
        </div>
        <div>
          <SettingIcon path={"/settings"} />
        </div>
      </div>

      <div>
        <div className="grid w-full grid-cols-2">
          {tabs.map((tab) => {
            return (
              <TabItem
                key={tab.path}
                label={tab.label}
                path={tab.path}
                end={tab.path === "/notifications"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotifyHeader;
