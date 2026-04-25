import { useEffect, useState } from "react";
import { fetcher } from "../../../../fetcher";
import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const FollowHome = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetcher("/api/users/who-to-follow?limit=10", {
          method: "GET",
        });

        setSuggestions(response?.data ?? []);
        setError(null);
      } catch (fetchError) {
        console.error("Error fetching suggestions:", fetchError);
        setError(
          fetchError.message || "Failed to load suggestions. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (error) {
    return <FetchError message={error} />;
  }

  console.log(suggestions);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : (
        <>
          <FollowSectionHeader
            title="Suggested for you"
            subtitle="Accounts you might want to follow based on product, design, and frontend interests"
          />
          <div>
            {suggestions.length > 0 ? (
              suggestions.map((profile) => (
                <FollowSuggestionCard
                  key={profile.userId ?? profile._id}
                  {...profile}
                />
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <p className="text-x-text-sec text-sm">
                  No follow suggestions are available right now.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FollowHome;
