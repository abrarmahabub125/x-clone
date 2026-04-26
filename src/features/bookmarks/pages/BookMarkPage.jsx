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
import { BookmarkIcon } from "lucide-react";

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
            <div className="px-4 py-12 text-center">
              <div className="bg-x-primary/10 text-x-primary mx-auto mb-4 flex w-max items-center justify-center rounded-full p-3">
                <BookmarkIcon className="text-x-blue size-8 md:size-10 lg:size-12" />
              </div>
              <h1 className="text-x-text text-lg font-semibold md:text-xl lg:text-4xl lg:font-bold">
                Save post for later
              </h1>
              <p className="text-x-text-sec mt-2.5 text-sm md:text-base lg:mt-4 lg:text-lg">
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
