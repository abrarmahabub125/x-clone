import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import { useAuth } from "../../auth/hooks/useAuth";
import BookmarkHeader from "../components/BookmarkHeader";
import { useEffect, useState } from "react";

const BookMarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth().user;

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${user.id}/bookmarks`,
        );
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setError(
          error.message || "Failed to load bookmarks. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [user.id]);

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <div>
      <BookmarkHeader />

      {/* bookmarks list  */}
      <div>
        <div>
          {loading ? (
            <div className="py-12 text-center">
              <Spinner />
            </div>
          ) : bookmarks.length > 0 ? (
            <div className="divide-y">
              {bookmarks.map((bookmark) => (
                <p>{bookmark.id}</p>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h1 className="text-x-text text-4xl font-bold">
                Save post for later
              </h1>
              <p className="text-x-text-sec mt-4 text-sm">
                Bookmark posts to easily find them again in the future.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookMarkPage;
