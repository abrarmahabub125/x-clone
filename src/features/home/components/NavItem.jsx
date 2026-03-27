import { createElement } from "react";
import { NavLink } from "react-router";

const NavItem = ({ to, Icon }) => {
  return (
    <li className="w-full">
      <NavLink
        to={to}
        className="hover:bg-x-surface inline-flex w-full items-center justify-center py-3 transition-all duration-200"
      >
        {({ isActive }) => (
          createElement(Icon, {
            strokeWidth: isActive ? 2.8 : 1.8,
            className: `transition-all duration-200 ${
              isActive ? "text-white" : "text-x-text"
            }`,
          })
        )}
      </NavLink>
    </li>
  );
};

export default NavItem;
