import { Outlet, NavLink } from "react-router";
import FollowHeader from "../components/FollowHeader";

const FollowSuggestionsPage = () => {
  const tabs = [
    { label: "Who to follow", path: "/connect-people" },
    { label: "Creators for you", path: "/connect-people/creators_for_you" },
  ];

  return (
    <div>
      <FollowHeader />

      <div className="min-h-fit">
        <div className="border-x-divider grid grid-cols-2 grid-rows-1 border-b">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === "/connect-people"}
              className="flex"
            >
              {({ isActive }) => (
                <div className="hover:bg-x-divider/35 flex w-full cursor-pointer items-center justify-center px-4 pt-3.5 transition-all duration-200 ease-in-out">
                  <div className="flex w-fit flex-col items-center">
                    <span
                      className={`text-sm sm:text-base ${
                        isActive
                          ? "text-x-text font-semibold"
                          : "text-x-text-sec"
                      }`}
                    >
                      {tab.label}
                    </span>

                    <div className="mt-2 h-1 w-full min-w-16 overflow-hidden rounded-full">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isActive ? "bg-x-blue" : "bg-transparent"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FollowSuggestionsPage;
