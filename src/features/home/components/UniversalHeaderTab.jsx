const UniversalHeaderTab = ({ isActive, setActive }) => {
  return (
    <div className="grid w-full grid-cols-2">
      <div
        onClick={() => setActive("for_you")}
        className="hover:bg-x-divider/35 flex w-full cursor-pointer items-center justify-center px-4 pt-3.5 transition-all duration-200 ease-in-out"
      >
        <div className="flex w-fit flex-col items-center">
          <span
            className={`text-sm sm:text-base ${
              isActive === "for_you"
                ? "text-x-text font-semibold"
                : "text-x-text-sec"
            }`}
          >
            For you
          </span>

          <div className="mt-2 h-1 w-full min-w-16 overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isActive === "for_you" ? "bg-x-blue" : "bg-transparent"
              }`}
            />
          </div>
        </div>
      </div>

      <div
        onClick={() => setActive("following")}
        className="hover:bg-x-divider/35 flex w-full cursor-pointer items-center justify-center px-4 pt-3.5 transition-all duration-200 ease-in-out"
      >
        <div className="flex w-fit flex-col items-center">
          <span
            className={`text-sm sm:text-base ${
              isActive === "following"
                ? "text-x-text font-semibold"
                : "text-x-text-sec"
            }`}
          >
            Following
          </span>

          <div className="mt-2 h-1 w-full min-w-16 overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isActive === "following" ? "bg-x-blue" : "bg-transparent"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalHeaderTab;
