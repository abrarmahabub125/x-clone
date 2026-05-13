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

const FollowingFeed = () => {
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [followingData, setFollowingData] = useState([]);
  const isFetchingRef = useRef(false);

  const fetchFollowingData = async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;

    try {
      const url = cursor
        ? `/api/feed/following?cursor=${cursor}&limit=10`
        : `/api/feed/following?limit=10`;

      const result = await fetcher(url);
      const newData = result.data || [];

      setError(null);
      setFollowingData((prev) => mergeUniqueTweets(prev, newData));
      setCursor(result.meta?.nextCursor || null);
      setHasMore(Boolean(result.meta?.hasMore));
    } catch (err) {
      setError(err.message);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchFollowingData();
  }, []);

  const handleLikeChange = (tweetId, change) => {
    setFollowingData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        isLiked: change.isLiked,
        likesCount: change.likesCount,
      }),
    );
  };

  const handleBookmarkChange = (tweetId, nextIsBookmarked) => {
    setFollowingData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        isBookmarked: nextIsBookmarked,
      }),
    );
  };

  const handleViewChange = (tweetId, change) => {
    setFollowingData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        viewsCount: change.viewsCount,
      }),
    );
  };

  const handleRetweetChange = (tweetId, change) => {
    setFollowingData((currentFeed) =>
      updateTweetById(currentFeed, tweetId, {
        isRetweeted: change.isRetweeted,
        retweetsCount: change.retweetsCount,
      }),
    );
  };

  const handleDelete = (tweetId) => {
    setFollowingData((currentFeed) => removeTweetById(currentFeed, tweetId));
  };

  if (error) {
    return (
      <div>
        <FetchError message={error} />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={followingData.length}
      next={fetchFollowingData}
      hasMore={hasMore}
      loader={
        <div className="my-4 flex justify-center">
          <Spinner />
        </div>
      }
      endMessage={
        <p className="text-x-text-sec py-4 text-center">No more tweets</p>
      }
    >
      {followingData.map((tweet, idx) => (
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

export default FollowingFeed;
