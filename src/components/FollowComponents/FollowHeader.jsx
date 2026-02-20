import BackButton from "../ReusedComponents/BackButton";
import SettingIcon from "../ReusedComponents/SettingIcon";

const FollowHeader = () => {
  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between px-2 py-2 backdrop-blur-3xl">
      <div className="flex items-center gap-x-2">
        <BackButton />
        <span className="text-x-text text-lg font-semibold sm:text-xl">
          Follow
        </span>
      </div>
      <div>
        <SettingIcon path={"/settings"} />
      </div>
    </div>
  );
};

export default FollowHeader;
