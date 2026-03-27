import HeaderForPhone from "./HeaderForPhone";
import UniversalHeaderTab from "./UniversalHeaderTab";
import PageHeader from "../../../shared/ui/PageHeader";

const HomeHeader = ({ isActive, setActive }) => {
  return (
    <PageHeader>
      <div className="border-x-divider mb-1 border-b md:hidden">
        <HeaderForPhone />
      </div>

      <UniversalHeaderTab isActive={isActive} setActive={setActive} />
    </PageHeader>
  );
};

export default HomeHeader;
