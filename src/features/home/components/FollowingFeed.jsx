import TweetCard from "../../../shared/ui/TweetCard";
import { useState, useEffect } from "react";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const FollowingFeed = () => {
  const [followingData, setFollowingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowingData = async () => {
      try {
        const result = await fetcher("/api/feed/following");
        setFollowingData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingData();
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
      <div>
        <div>
          {followingData.length === 0 ? (
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
            followingData.map((tweet) => (
              <TweetCard key={tweet._id} {...tweet} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingFeed;
