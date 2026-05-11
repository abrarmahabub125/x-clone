import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import TweetCard from "../../../shared/ui/TweetCard";
import {
  mergeUniqueTweets,
  removeTweetById,
  updateTweetById,
} from "../../../shared/utils/tweetListState";

const NewsFeed = () => {
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [feedData, setFeedData] = useState([]);
  const isFetchingRef = useRef(false);

  const fetchFeedData = async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;

    try {
      const url = cursor
        ? `/api/feed/for-you?cursor=${cursor}&limit=10`
        : `/api/feed/for-you?limit=10`;

      const result = await fetcher(url);
      const newData = result.data || [];

      setError(null);
      setFeedData((prev) => mergeUniqueTweets(prev, newData));
      setCursor(result.nextCursor || null);
      setHasMore(Boolean(result.hasMore));
    } catch (err) {
      setError(err.message);
    } finally {
      isFetchingRef.current = false;
    }
  };

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

  const handleViewChange = (tweetId, change) => {
    setFeedData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        viewsCount: change.viewsCount,
      }),
    );
  };

  const handleRetweetChange = (tweetId, change) => {
    setFeedData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        isRetweeted: change.isRetweeted,
        retweetsCount: change.retweetsCount,
      }),
    );
  };

  const handleDelete = (tweetId) => {
    setFeedData((currentFeed) => removeTweetById(currentFeed, tweetId));
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
          key={tweet._id ?? idx}
          {...tweet}
          onLikeChange={handleLikeChange}
          onBookmarkChange={handleBookmarkChange}
          onViewChange={handleViewChange}
          onRetweetChange={handleRetweetChange}
          onDelete={handleDelete}
        />
      ))}
    </InfiniteScroll>
  );
};

export default NewsFeed;
