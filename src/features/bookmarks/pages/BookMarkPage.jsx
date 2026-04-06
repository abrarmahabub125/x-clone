import { useEffect, useState } from "react";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import { useAuth } from "../../auth/hooks/useAuth";
import BookmarkHeader from "../components/BookmarkHeader";

const BookMarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.id) {
        setBookmarks([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetcher(`/api/users/${user.id}/bookmarks`, {
          method: "GET",
        });

        setBookmarks(response?.data ?? []);
        setError(null);
      } catch (fetchError) {
        console.error("Error fetching bookmarks:", fetchError);
        setError(
          fetchError.message ||
            "Failed to load bookmarks. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user?.id]);

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <div>
      <BookmarkHeader />

      <div>
        <div>
          {loading ? (
            <div className="py-12 text-center">
              <Spinner />
            </div>
          ) : bookmarks.length > 0 ? (
            <div className="divide-y">
              {bookmarks.map((bookmark, index) => {
                const bookmarkKey =
                  bookmark._id ?? bookmark.tweetId ?? `${bookmark.userId}-${index}`;
                const bookmarkLabel =
                  bookmark.content ??
                  bookmark.tweet?.content ??
                  `Saved post ${index + 1}`;
                const bookmarkMeta = bookmark.tweetId ?? bookmark.tweet?._id;

                return (
                  <div key={bookmarkKey} className="px-4 py-4">
                    <p className="text-x-text text-sm font-medium">
                      {bookmarkLabel}
                    </p>
                    {bookmarkMeta && (
                      <p className="text-x-text-sec mt-1 text-xs">
                        Tweet ID: {bookmarkMeta}
                      </p>
                    )}
                  </div>
                );
              })}
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

