import BookmarkHeader from "../components/BookmarkComponents/BookmarkHeader";
import { Search } from "lucide-react";

const BookMarkPage = () => {
  return (
    <div>
      <BookmarkHeader />
      <div className="min-h-screen px-4 py-1.5">
        {/* Search bar components  */}
        <div>
          <div className="border-x-divider relative w-full rounded-full border">
            <form>
              <label>
                <span className="absolute top-1/2 left-2 -translate-y-1/2">
                  <Search className="stroke-x-text-sec size-4 stroke-2" />
                </span>
                <input
                  className="text-x-text focus-within:outline-x-blue h-full w-full rounded-full border-0 py-2.5 pr-4 pl-8 text-xs font-normal outline-0 transition-all duration-50 focus:outline-2 sm:text-sm"
                  type="text"
                  placeholder="Search Bookmarks"
                />
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMarkPage;
