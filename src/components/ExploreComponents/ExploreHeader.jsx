import SettingIcon from "../ReusedComponents/SettingIcon";
import SearchBar from "../ReusedComponents/SearchBar";
import BackButton from "../ReusedComponents/BackButton";
import TabItem from "../ReusedComponents/TabItem";

const ExploreHeader = () => {
  const tabs = [
    { label: "For you", path: "/explore" },
    { label: "Trending", path: "/explore/trending" },
    { label: "News", path: "/explore/news" },
    { label: "Sports", path: "/explore/sports" },
    { label: "Entertainment", path: "/explore/entertainment" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-x-2 px-2 py-2 sm:gap-x-3 sm:px-3 md:gap-x-4 md:px-4">
        {/* back button  */}
        <div className="shrink-0">
          <BackButton />
        </div>
        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>
        <div className="shrink-0">
          <SettingIcon path={"/settings"} />
        </div>
      </div>

      <div>
        <div className="border-x-divider flex justify-around border-b">
          {tabs.map((tab) => {
            return (
              <TabItem
                key={tab.path}
                label={tab.label}
                path={tab.path}
                end={tab.path === "/explore"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;
