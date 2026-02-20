import { Outlet } from "react-router";
import MainSidebar from "../root-sidebar/MainSidebar";
import SecondSidebar from "../components/SidebarComponent/SecondSidebar";
import Navbar from "../components/HomeFeedComponents/Navbar";
import { Suspense } from "react";
import Spinner from "../components/loaders/Spinner";

const RootLayout = () => {
  return (
    <div className="grid w-full max-w-7xl md:grid-cols-[5rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)]">
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:block">
        <div className="fixed top-0 h-screen px-4">
          <MainSidebar />
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="grid w-full gap-x-8 md:grid-cols-[minmax(0,1fr)_19rem] lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* CENTER CONTENT */}
        <div className="border-x-divider border-r border-l">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
          <Navbar />
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden md:block">
          <div className="sticky top-0 h-screen pr-4">
            <SecondSidebar />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RootLayout;
