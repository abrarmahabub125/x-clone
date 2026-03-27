import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import SettingIcon from "../../../shared/ui/SettingIcon";
import TabItem from "../../../shared/ui/TabItem";

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
    <PageHeader>
      <div className="border-x-divider flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-x-2">
          <BackButton />
          <span className="text-x-text text-lg font-semibold sm:text-xl">
            Notifications
          </span>
        </div>
        <div>
          <SettingIcon path="/settings" />
        </div>
      </div>

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
    </PageHeader>
  );
};

export default NotifyHeader;
