import BackButton from "../ReusedComponents/BackButton";

const BookmarkHeader = () => {
  return (
    <div className="sticky top-0 z-50 flex w-full items-center gap-x-2 px-2 py-2 backdrop-blur-3xl">
      <div className="flex items-center gap-x-2">
        <BackButton />
        <span className="text-x-text text-lg font-semibold sm:text-xl">
          Bookmarks
        </span>
      </div>
    </div>
  );
};

export default BookmarkHeader;
