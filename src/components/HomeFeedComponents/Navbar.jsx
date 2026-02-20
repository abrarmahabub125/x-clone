import { Bell, Home, Search, UserCircle2Icon, Users2Icon } from "lucide-react";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <div className="border-x-divider bg-x-bg fixed bottom-0 w-full border-t backdrop-blur-2xl md:hidden">
      <div>
        <ul className="grid grid-cols-5 justify-items-center">
          <NavItem to="/" Icon={Home} />
          <NavItem to="/explore" Icon={Search} />
          <NavItem to="/communities" Icon={Users2Icon} />
          <NavItem to="/notifications" Icon={Bell} />
          <NavItem to="/profile/123" Icon={UserCircle2Icon} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
