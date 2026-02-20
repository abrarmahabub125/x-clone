import { Settings } from "lucide-react";
import { Link } from "react-router";

const SettingIcon = ({ path }) => {
  return (
    <>
      <Link to={path}>
        <span className="hover:bg-x-surface flex size-9 items-center justify-center rounded-full transition-colors duration-200">
          <Settings className="size-5" />
        </span>
      </Link>
    </>
  );
};

export default SettingIcon;
