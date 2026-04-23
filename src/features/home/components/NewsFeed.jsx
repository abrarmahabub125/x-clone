import { useState, useEffect } from "react";
import TweetCard from "../../../shared/ui/TweetCard";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import { updateTweetById } from "../../../shared/utils/tweetListState";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsFeed = () => {
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [feedData, setFeedData] = useState([]);

  // 🔥 FETCH FUNCTION
  const fetchFeedData = async () => {
    try {
      const url = cursor
        ? `/api/feed/for-you?cursor=${cursor}&limit=10`
        : `/api/feed/for-you?limit=10`;

      const result = await fetcher(url);

      const newData = result.data || [];

      // append data
      setFeedData((prev) => [...prev, ...newData]);

      // update cursor from backend
      setCursor(result.nextCursor || null);

      // stop if no more data
      if (!result.nextCursor || newData.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // initial load
  useEffect(() => {
    fetchFeedData();
  }, []);

  const handleLikeChange = (tweetId, change) => {
    setFeedData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        isLiked: change.isLiked,
        likesCount: change.likesCount,
      }),
    );
  };

  const handleBookmarkChange = (tweetId, nextIsBookmarked) => {
    setFeedData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        isBookmarked: nextIsBookmarked,
      }),
    );
  };

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <InfiniteScroll
      dataLength={feedData.length}
      next={fetchFeedData}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      }
      endMessage={
        <p className="text-x-text-sec py-4 text-center">No more tweets</p>
      }
    >
      {feedData.map((tweet, idx) => (
        <TweetCard
          key={idx}
          {...tweet}
          onLikeChange={handleLikeChange}
          onBookmarkChange={handleBookmarkChange}
        />
      ))}
    </InfiniteScroll>
  );
};

export default NewsFeed;
