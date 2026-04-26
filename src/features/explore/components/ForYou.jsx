import TweetCard from "../../../shared/ui/TweetCard";
import { useSearch } from "../../auth/hooks/useSearch";
import FollowSuggestionCard from "../../follow/components/FollowSuggestionCard";
import { Search, SearchX } from "lucide-react";

const ForYou = ({ results, onLikeChange, onBookmarkChange }) => {
  const { searchQuery: query } = useSearch();

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-2 rounded-full p-5">
          <Search className="text-x-text h-8 w-8" />
        </div>

        <h2 className="text-x-text text-xl font-semibold md:text-2xl lg:text-3xl">
          Start Exploring
        </h2>

        <p className="text-x-text-sec mt-2 max-w-md text-xs lg:text-sm">
          Search people, posts, topics, or keywords
        </p>
      </div>
    );
  }

  const { users, tweets } = results;

  if (users.length < 1 && tweets.length < 1)
    return (
      <div className="flex w-full flex-col items-center justify-center px-4 py-16 text-center">
        {/* Icon */}
        <div className="mb-2.5 rounded-full p-4 lg:mb-4">
          <SearchX className="text-x-text-sec size-10 lg:size-12" />
        </div>

        {/* Title */}
        <h2 className="text-x-text text-lg font-semibold lg:text-xl">
          No results found
        </h2>

        {/* Description */}
        <p className="text-x-text-sec mt-2 max-w-md text-xs lg:text-sm">
          {query
            ? `We couldn't find anything for "${query}". Try different keywords or check spelling.`
            : "Try searching for something else."}
        </p>
      </div>
    );

  return (
    <div>
      {users.length < 1 ? (
        ""
      ) : (
        <div>
          {users.map((user, idx) => (
            <FollowSuggestionCard key={idx} {...user} />
          ))}
        </div>
      )}

      {tweets.length < 1 ? (
        ""
      ) : (
        <div>
          {tweets.map((tweet, idx) => (
            <TweetCard
              key={tweet._id ?? idx}
              {...tweet}
              onLikeChange={onLikeChange}
              onBookmarkChange={onBookmarkChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForYou;
