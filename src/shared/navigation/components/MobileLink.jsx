import { NavLink } from "react-router";

const MainLink = ({ path, icon, label }) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <div className="group">
          <div className="group-hover:bg-x-surface inline-flex items-center gap-2.5 rounded-full transition-colors duration-200">
            <div className="hover:bg-x-surface flex size-8 items-center justify-center rounded-full">
              {icon}
            </div>
            <div className="h-full pr-6 pl-1">
              <span
                className={
                  isActive ? "text-lg font-bold sm:text-xl" : "text-lg sm:text-xl"
                }
              >
                {label}
              </span>
            </div>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export default MainLink;
