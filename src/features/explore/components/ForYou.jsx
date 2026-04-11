import TweetCard from "../../../shared/ui/TweetCard";
import FollowSuggestionCard from "../../follow/components/FollowSuggestionCard";
import { Search } from "lucide-react";

const ForYou = ({ results }) => {
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-2 rounded-full p-5">
          <Search className="text-x-text h-8 w-8" />
        </div>

        <h2 className="text-x-text text-3xl font-semibold">Start Exploring</h2>

        <p className="text-x-text-sec mt-2 max-w-md text-sm">
          Search for people, posts, or topics.
        </p>
      </div>
    );
  }

  const { users, tweets } = results;

  console.log(users, tweets);

  if (users.length < 1 && tweets.length < 1)
    return (
      <div className="py-12">
        <p className="text-x-text text-center text-xl font-semibold">
          No results found
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
            <TweetCard key={idx} {...tweet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForYou;
