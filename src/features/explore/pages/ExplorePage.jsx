import ExploreHeader from "../components/ExploreHeader";
import Spinner from "../../../shared/loaders/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { fetcher } from "../../../../fetcher";
import ForYou from "../components/ForYou";
import FetchError from "../../../shared/ui/FetchError";
import { updateTweetById } from "../../../shared/utils/tweetListState";

const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) {
        setResults(null);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetcher(
          `/api/explore/search?q=${encodeURIComponent(query)}`,
        );
        setResults(response?.data ?? { users: [], tweets: [] });
        setError(null);
      } catch (e) {
        setError(e.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleLikeChange = (tweetId, change) => {
    setResults((currentResults) => {
      if (!currentResults) {
        return currentResults;
      }

      return {
        ...currentResults,
        tweets: updateTweetById(currentResults.tweets ?? [], tweetId, {
          isLiked: change.isLiked,
          likesCount: change.likesCount,
        }),
      };
    });
  };

  const handleBookmarkChange = (tweetId, nextIsBookmarked) => {
    setResults((currentResults) => {
      if (!currentResults) {
        return currentResults;
      }

      return {
        ...currentResults,
        tweets: updateTweetById(currentResults.tweets ?? [], tweetId, {
          isBookmarked: nextIsBookmarked,
        }),
      };
    });
  };

  return (
    <div>
      <ExploreHeader query={query} setQuery={setQuery} />

      {error && <FetchError message={error} />}

      {loading ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        <div>
          <ForYou
            results={results}
            onLikeChange={handleLikeChange}
            onBookmarkChange={handleBookmarkChange}
          />
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
