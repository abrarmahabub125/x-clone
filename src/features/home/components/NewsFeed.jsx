import { useState, useEffect } from "react";
import TweetCard from "../../../shared/ui/TweetCard";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const NewsFeed = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const result = await fetcher("/api/feed/for-you");
        setFeedData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <FetchError message={error} />
      </div>
    );
  }

  return (
    <div>
      {feedData.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-transparent p-6 text-center">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              No tweets to show
            </h2>

            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Follow some users to see their tweets here.
            </p>
          </div>
        </div>
      ) : (
        feedData.map((tweet) => <TweetCard key={tweet._id} {...tweet} />)
      )}
    </div>
  );
};

export default NewsFeed;
