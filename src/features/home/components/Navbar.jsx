import {
  Bell,
  Home,
  Search,
  UserCircle2Icon,
  UserPlus2Icon,
} from "lucide-react";
import NavItem from "./NavItem";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="border-x-divider bg-x-bg fixed bottom-0 w-full border-t backdrop-blur-2xl md:hidden">
      <div>
        <ul className="grid grid-cols-5 justify-items-center">
          <NavItem to="/" Icon={Home} />
          <NavItem to="/explore" Icon={Search} />
          <NavItem to="/connect-people" Icon={UserPlus2Icon} />
          <NavItem to="/notifications" Icon={Bell} />
          <NavItem to={`/profile/${user.id}`} Icon={UserCircle2Icon} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
