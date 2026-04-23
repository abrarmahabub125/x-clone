import TweetCard from "../../../shared/ui/TweetCard";
import { useState, useEffect } from "react";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import { updateTweetById } from "../../../shared/utils/tweetListState";

import InfiniteScroll from "react-infinite-scroll-component";

const FollowingFeed = () => {
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [followingData, setFollowingData] = useState([]);

  // 🔥 FETCH FUNCTION
  const fetchFollowingData = async () => {
    try {
      const url = cursor
        ? `/api/feed/following?cursor=${cursor}&limit=10`
        : `/api/feed/following?limit=10`;

      const result = await fetcher(url);

      const newData = result.data || [];

      // append data
      setFollowingData((prev) => [...prev, ...newData]);

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
          key={idx}
          {...tweet}
          onLikeChange={handleLikeChange}
          onBookmarkChange={handleBookmarkChange}
        />
      ))}
    </InfiniteScroll>
  );
};

export default FollowingFeed;
