import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { axiosInstance } from "../../../shared/lib/axiosInstance";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

import { useSearch } from "../../auth/hooks/useSearch";

import ExploreHeader from "../components/ExploreHeader";
import ForYou from "../components/ForYou";

const ExplorePage = () => {
  const queryClient = useQueryClient();

  const { searchQuery, setSearchQuery } = useSearch();

  // =========================
  // Debounce State
  // =========================
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // =========================
  // Fetch Search Results
  // =========================
  const findResults = async () => {
    if (!debouncedSearch) {
      return {
        data: {
          users: [],
          tweets: [],
        },
      };
    }

    const res = await axiosInstance.get(
      `/explore/search?q=${encodeURIComponent(debouncedSearch)}`,
    );

    return res.data;
  };

  const {
    data: results,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["explore", debouncedSearch],
    queryFn: findResults,
    enabled: !!debouncedSearch,
    staleTime: 30 * 1000,
    gcTime: 1 * 60 * 1000,
  });

  // =========================
  // Update Tweet Helper
  // =========================
  const updateTweetById = (tweets, tweetId, updates) => {
    return tweets.map((tweet) =>
      tweet._id === tweetId
        ? {
            ...tweet,
            ...updates,
          }
        : tweet,
    );
  };

  // =========================
  // Like Handler
  // =========================
  const handleLikeChange = (tweetId, change) => {
    queryClient.setQueryData(["explore", debouncedSearch], (currentData) => {
      if (!currentData) {
        return currentData;
      }

      return {
        ...currentData,
        data: {
          ...currentData.data,
          tweets: updateTweetById(currentData.data.tweets ?? [], tweetId, {
            isLiked: change.isLiked,
            likesCount: change.likesCount,
          }),
        },
      };
    });
  };

  // =========================
  // Bookmark Handler
  // =========================
  const handleBookmarkChange = (tweetId, nextIsBookmarked) => {
    queryClient.setQueryData(["explore", debouncedSearch], (currentData) => {
      if (!currentData) {
        return currentData;
      }

      return {
        ...currentData,
        data: {
          ...currentData.data,
          tweets: updateTweetById(currentData.data.tweets ?? [], tweetId, {
            isBookmarked: nextIsBookmarked,
          }),
        },
      };
    });
  };

  return (
    <div>
      <ExploreHeader query={searchQuery} setQuery={setSearchQuery} />

      {isError && (
        <FetchError message={error?.message || "Something went wrong!"} />
      )}

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        <div>
          <ForYou
            results={results?.data}
            onLikeChange={handleLikeChange}
            onBookmarkChange={handleBookmarkChange}
          />
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
