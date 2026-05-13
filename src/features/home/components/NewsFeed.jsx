import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetcher } from "../../../../fetcher";

import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import TweetCard from "../../../shared/ui/TweetCard";

import {
  alternateFollowedAndNonFollowed,
  mergeUniqueTweets,
  removeTweetById,
  updateTweetById,
} from "../../../shared/utils/tweetListState";

const LIMIT = 10;

const NewsFeed = () => {
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedData = async () => {
    // Prevent duplicate fetch
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const url = cursor
        ? `/api/feed/for-you?cursor=${cursor}&limit=${LIMIT}`
        : `/api/feed/for-you?limit=${LIMIT}`;

      const result = await fetcher(url);

      const newData = result?.data || [];

      const alternatedNewData = alternateFollowedAndNonFollowed(newData);

      setFeedData((prev) => mergeUniqueTweets(prev, alternatedNewData));

      setCursor(result?.meta?.nextCursor || null);

      setHasMore(Boolean(result?.meta?.hasMore));

      setError(null);
    } catch (err) {
      console.error(err);

      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
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

  if (error && feedData.length === 0) {
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
      {feedData.map((tweet) => (
        <TweetCard
          key={tweet._id}
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
