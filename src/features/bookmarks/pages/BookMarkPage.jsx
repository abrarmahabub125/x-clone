import { useEffect, useState } from "react";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import { useAuth } from "../../auth/hooks/useAuth";
import BookmarkHeader from "../components/BookmarkHeader";
import TweetCard from "../../../shared/ui/TweetCard";
import {
  removeTweetById,
  updateTweetById,
} from "../../../shared/utils/tweetListState";

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
        setLoading(true);
        setError(null);
        const response = await fetcher(`/api/bookmarks`, {
          method: "GET",
        });

        setBookmarks(response?.data ?? []);
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

  const handleBookmarkChange = (tweetId, nextIsBookmarked) => {
    if (nextIsBookmarked) {
      return;
    }

    setBookmarks((prevBookmarks) => removeTweetById(prevBookmarks, tweetId));
  };

  const handleLikeChange = (tweetId, change) => {
    setBookmarks((prevBookmarks) =>
      updateTweetById(prevBookmarks, tweetId, {
        isLiked: change.isLiked,
        likesCount: change.likesCount,
      }),
    );
  };

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
              {bookmarks.map((bookmark) => (
                <TweetCard
                  key={bookmark._id}
                  {...bookmark}
                  onLikeChange={handleLikeChange}
                  onBookmarkChange={handleBookmarkChange}
                />
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
