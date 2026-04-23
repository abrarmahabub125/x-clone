import {
  Bell,
  Home,
  Search,
  UserCircle2Icon,
  UserPlus2Icon,
} from "lucide-react";
import NavItem from "./NavItem";
import { useAuth } from "../../auth/hooks/useAuth";
import { Link, useLocation } from "react-router";
import ComposeTweet from "../../../shared/navigation/components/ComposeTweet";
import TweetIcon from "../../../shared/assets/tweet-icon.jpg";
import { useMemo } from "react";

const Navbar = () => {
  const { user } = useAuth();

  const location = useLocation();

  const composeHref = useMemo(() => {
    const params = new URLSearchParams(location.search);
    params.set("compose", "1");

    return {
      pathname: location.pathname,
      search: `?${params.toString()}`,
    };
  }, [location.pathname, location.search]);

  return (
    <div className="border-x-divider bg-x-bg fixed bottom-0 w-full border-t backdrop-blur-2xl md:hidden">
      <div className="absolute right-3.5 bottom-18 flex size-12 items-center justify-center rounded-full bg-amber-50">
        <ComposeTweet composeHref={composeHref} tweetIcon={TweetIcon} />
      </div>
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
