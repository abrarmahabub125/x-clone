import { useEffect, useState } from "react";
import { fetcher } from "../../../../fetcher";
import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const CreatorsForYou = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetcher("/api/users/creators", {
          method: "GET",
        });

        setCreators(response?.data ?? []);
        setError(null);
      } catch (fetchError) {
        console.error("Error fetching suggestions:", fetchError);
        setError(fetchError.message || "Failed to load creators. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : (
        <>
          <FollowSectionHeader
            title="Creators for you"
            subtitle="Popular creators in design, frontend, and product conversations"
          />
          <div>
            {creators.length > 0 ? (
              creators.map((creator) => (
                <FollowSuggestionCard
                  key={creator.userId ?? creator._id}
                  {...creator}
                />
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <p className="text-x-text-sec text-sm">
                  No creator suggestions are available right now.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CreatorsForYou;

