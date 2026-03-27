import { Outlet } from "react-router";
import { Suspense } from "react";
import NotifyHeader from "../components/NotifyHeader";
import Spinner from "../../../shared/loaders/Spinner";

const NotificationsPage = () => {
  return (
    <div>
      <div className="border-x-divider sticky top-0 z-50 w-full border-b backdrop-blur-3xl">
        <div>
          <NotifyHeader />
        </div>
      </div>

      <div>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default NotificationsPage;
