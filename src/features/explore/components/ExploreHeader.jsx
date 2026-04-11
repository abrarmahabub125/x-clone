import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import SearchBar from "../../../shared/ui/SearchBar";
import SettingIcon from "../../../shared/ui/SettingIcon";

const ExploreHeader = ({ query, setQuery }) => {
  return (
    <PageHeader>
      <div className="flex items-center justify-between gap-x-2 px-2 py-2 sm:gap-x-3 sm:px-3 md:gap-x-4 md:px-4">
        <div className="shrink-0">
          <BackButton />
        </div>
        <div className="min-w-0 flex-1">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
        <div className="shrink-0">
          <SettingIcon path="/settings" />
        </div>
      </div>
    </PageHeader>
  );
};

export default ExploreHeader;
