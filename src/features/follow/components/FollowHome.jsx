import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";

const FollowHome = () => {
  const {
    data: suggestedUsers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["follow-suggestions"],
    queryFn: () =>
      axiosInstance
        .get("/users/who-to-follow?limit=10")
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  if (isError) {
    return <FetchError message={error} />;
  }

  return (
    <div>
      {isLoading ? (
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
            {suggestedUsers.data?.length > 0 ? (
              suggestedUsers.data.map((profile) => (
                <FollowSuggestionCard
                  key={profile.userId ?? profile._id}
                  {...profile}
                />
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <p className="text-x-text-sec text-sm lg:text-base">
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
