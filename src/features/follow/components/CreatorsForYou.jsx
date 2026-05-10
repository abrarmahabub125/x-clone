import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";

const CreatorsForYou = () => {
  const {
    data: creators,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["creators-for-you"],
    queryFn: async () =>
      axiosInstance.get("/users/creators").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
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
            title="Creators for you"
            subtitle="Popular creators in design, frontend, and product conversations"
          />
          <div>
            {creators && creators.length > 0 ? (
              creators.map((creator) => (
                <FollowSuggestionCard
                  key={creator.userId ?? creator._id}
                  {...creator}
                />
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <p className="text-x-text-sec text-sm lg:text-base">
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
