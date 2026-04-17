import HeaderForPhone from "./HeaderForPhone";
import UniversalHeaderTab from "./UniversalHeaderTab";
import PageHeader from "../../../shared/ui/PageHeader";

const HomeHeader = ({ isActive, setActive }) => {
  return (
    <PageHeader>
      <HeaderForPhone />

      <UniversalHeaderTab isActive={isActive} setActive={setActive} />
    </PageHeader>
  );
};

export default HomeHeader;
