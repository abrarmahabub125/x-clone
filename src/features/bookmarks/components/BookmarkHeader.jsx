import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";

const BookmarkHeader = () => {
  return (
    <PageHeader className="px-3 py-2">
      <div className="flex items-center gap-2">
        <BackButton />
        <div>
          <h2 className="text-x-text text-lg font-semibold sm:text-xl">
            Bookmarks
          </h2>
        </div>
      </div>
    </PageHeader>
  );
};

export default BookmarkHeader;
