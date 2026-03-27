import { Outlet } from "react-router";
import { Suspense } from "react";
import ExploreHeader from "../components/ExploreHeader";
import Spinner from "../../../shared/loaders/Spinner";
import TabItem from "../../../shared/ui/TabItem";

const tabs = [
  { label: "For you", path: "/explore" },
  { label: "Trending", path: "/explore/trending" },
  { label: "Entertainment", path: "/explore/entertainment" },
  { label: "News", path: "/explore/news" },
  { label: "Sports", path: "/explore/sports" },
];

const ExplorePage = () => {
  return (
    <div>
      <ExploreHeader />

      <div className="border-x-divider scrollbar-hide flex w-screen justify-around overflow-x-scroll border-b md:w-full">
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

      <div>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default ExplorePage;
