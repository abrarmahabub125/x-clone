import HeaderForPhone from "./HeaderForPhone";
import UniversalHeaderTab from "./UniversalHeaderTab";

const HomeHeader = ({ isActive, setActive }) => {
  return (
    <div className="border-x-divider sticky top-0 z-50 border-b backdrop-blur-3xl">
      {/* Header for mobile device  */}
      <div className="mb-1 md:hidden">
        <div>
          <HeaderForPhone />
        </div>
      </div>
      <UniversalHeaderTab isActive={isActive} setActive={setActive} />
    </div>
  );
};

export default HomeHeader;
