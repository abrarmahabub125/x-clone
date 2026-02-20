import { Outlet } from "react-router";
import ExploreHeader from "../components/ExploreComponents/ExploreHeader";
import { Suspense } from "react";
import Spinner from "../components/loaders/Spinner";

const ExplorePage = () => {
  return (
    <div>
      <div>
        <ExploreHeader />
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
