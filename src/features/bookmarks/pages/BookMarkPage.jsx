import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookmarkIcon } from "lucide-react";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import TweetCard from "../../../shared/ui/TweetCard";
import { removeTweetById } from "../../../shared/utils/tweetListState";
import { useAuth } from "../../auth/hooks/useAuth";
import BookmarkHeader from "../components/BookmarkHeader";

const BookMarkPage = () => {
  const { user } = useAuth();

  const fetchBookmarks = () => {
    if (!user?.id) return;
    const response = axiosInstance.get("/bookmarks").then((res) => res.data);
    return response;
  };

  const {
    data: bookmarks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  const bookmarkItems = Array.isArray(bookmarks)
    ? bookmarks
    : bookmarks?.data ?? [];

  const queryClient = useQueryClient();

  const handleBookmarkChange = (tweetId, nextIsBookmarked) => {
    queryClient.setQueryData(["bookmarks"], (prevBookmarks) => {
      if (!prevBookmarks) return prevBookmarks;

      if (!nextIsBookmarked) {
        return {
          ...prevBookmarks,
          data: prevBookmarks.data.filter(
            (bookmark) => bookmark._id !== tweetId,
          ),
        };
      }
      return prevBookmarks;
    });
  };

  const handleLikeChange = (tweetId, change) => {
    queryClient.setQueryData(["bookmarks"], (prevBookmarks) => {
      if (!prevBookmarks) return prevBookmarks;

      return {
        ...prevBookmarks,

        data: prevBookmarks.data.map((tweet) =>
          tweet._id === tweetId
            ? {
                ...tweet,
                isLiked: change.isLiked,
                likesCount: change.likesCount,
              }
            : tweet,
        ),
      };
    });
  };

  const handleViewChange = (tweetId, change) => {
    queryClient.setQueryData(["bookmarks"], (prevBookmarks) => {
      if (!prevBookmarks) return prevBookmarks;

      return {
        ...prevBookmarks,
        data: prevBookmarks.data.map((tweet) =>
          tweet._id === tweetId
            ? {
                ...tweet,
                viewsCount: change.viewsCount,
              }
            : tweet,
        ),
      };
    });
  };

  const handleRetweetChange = (tweetId, change) => {
    queryClient.setQueryData(["bookmarks"], (prevBookmarks) => {
      if (!prevBookmarks) return prevBookmarks;

      return {
        ...prevBookmarks,
        data: prevBookmarks.data.map((tweet) =>
          tweet._id === tweetId
            ? {
                ...tweet,
                isRetweeted: change.isRetweeted,
                retweetsCount: change.retweetsCount,
              }
            : tweet,
        ),
      };
    });
  };

  const handleDelete = (tweetId) => {
    queryClient.setQueryData(["bookmarks"], (prevBookmarks) => {
      if (!prevBookmarks) return prevBookmarks;

      return {
        ...prevBookmarks,
        data: removeTweetById(prevBookmarks.data, tweetId),
      };
    });
  };

  if (isError) {
    return <FetchError message={error} />;
  }

  return (
    <div>
      <BookmarkHeader />

      <div>
        <div>
          {isLoading ? (
            <div className="py-12 text-center">
              <Spinner />
            </div>
          ) : bookmarkItems.length > 0 ? (
            <div className="divide-y">
              {bookmarkItems.map((bookmark) => (
                <TweetCard
                  key={bookmark._id}
                  {...bookmark}
                  onLikeChange={handleLikeChange}
                  onBookmarkChange={handleBookmarkChange}
                  onViewChange={handleViewChange}
                  onRetweetChange={handleRetweetChange}
                  onDelete={handleDelete}
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
