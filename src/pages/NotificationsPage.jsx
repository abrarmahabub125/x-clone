import { Outlet } from "react-router";
import NotifyHeader from "../components/NotificationComponent/NotifyHeader";
import { Suspense } from "react";
import Spinner from "../components/loaders/Spinner";

const NotificationsPage = () => {
  return (
    <div>
      {/* Header of notifications  */}
      <div className="border-x-divider sticky top-0 z-50 w-full border-b backdrop-blur-3xl">
        <div>
          <NotifyHeader />
        </div>
      </div>

      {/* Notifications list  */}
      <div>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default NotificationsPage;
