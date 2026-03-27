import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import SettingIcon from "../../../shared/ui/SettingIcon";

const FollowHeader = () => {
  return (
    <PageHeader className="px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BackButton />
          <span className="text-x-text text-lg font-semibold sm:text-xl">
            Connect
          </span>
        </div>
        <SettingIcon path="/settings" />
      </div>
    </PageHeader>
  );
};

export default FollowHeader;
