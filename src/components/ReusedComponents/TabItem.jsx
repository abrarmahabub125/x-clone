import { NavLink } from "react-router";

const TabItem = ({ label, path, end = false }) => {
  return (
    <NavLink className="flex-1" to={path} end={end}>
      {({ isActive }) => (
        <div className="hover:bg-x-divider/35 flex w-full shrink-0 cursor-pointer items-center justify-center transition-all duration-200 ease-in-out md:px-2 lg:px-6">
          <div className="flex w-fit flex-col items-center pt-3.5">
            <span
              className={`text-sm whitespace-nowrap md:text-base ${
                isActive ? "text-x-text font-semibold" : "text-x-text-sec"
              }`}
            >
              {label}
            </span>

            <div className="mt-2 h-0.5 w-full min-w-12 overflow-hidden rounded-full sm:min-w-16 md:h-1">
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
  );
};

export default TabItem;
