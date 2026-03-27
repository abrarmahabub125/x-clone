import { Outlet, useLocation, useSearchParams } from "react-router";
import { Suspense } from "react";
import MainSidebar from "../../shared/navigation/MainSidebar";
import Navbar from "../../features/home/components/Navbar";
import Spinner from "../../shared/loaders/Spinner";
import SecondSidebar from "../../shared/sidebar/components/SecondSidebar";
import CreatePostModal from "../../features/post/pages/CreatePostModal";

const RootLayout = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isComposeModal =
    location.pathname !== "/compose/post" && searchParams.get("compose") === "1";

  const handleCloseComposeModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("compose");
    setSearchParams(nextSearchParams);
  };

  return (
    <div className="grid w-full max-w-7xl md:grid-cols-[5rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="hidden md:block">
        <div className="fixed top-0 h-screen px-4">
          <MainSidebar />
        </div>
      </aside>

      <main className="grid w-full gap-x-8 md:grid-cols-[minmax(0,1fr)_19rem] lg:grid-cols-[minmax(30rem,1fr)_22rem]">
        <div className="border-x-divider border-r border-l">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
          <Navbar />
        </div>

        <aside className="hidden md:block">
          <div className="sticky top-0 h-screen pr-4">
            <SecondSidebar />
          </div>
        </aside>
      </main>

      {isComposeModal && (
        <CreatePostModal isModal onClose={handleCloseComposeModal} />
      )}
    </div>
  );
};

export default RootLayout;
