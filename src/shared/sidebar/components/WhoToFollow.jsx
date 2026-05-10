import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { axiosInstance } from "../../lib/axiosInstance";
import Spinner from "../../loaders/Spinner";
import WhoToFollowCard from "./WhoToFollowCard";

const WhoToFollow = () => {
  const {
    data: whoToFollow,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["who-to-follow"],
    queryFn: async () =>
      axiosInstance.get("/users/who-to-follow?limit=3").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  });

  if (isError) {
    return (
      <div className="flex min-h-44 items-center justify-center text-sm text-red-600">
        {"Failed to load suggestions"}
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="px-4 py-3">
          <div>
            <span className="text-x-text text-xl font-extrabold">
              Who to follow
            </span>
          </div>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-y-4 pb-3">
        {isLoading ? (
          <div className="flex min-h-44 items-center justify-center">
            <Spinner />
          </div>
        ) : whoToFollow?.data.length === 0 ? (
          <div className="flex min-h-32 items-center justify-center">
            <span className="text-x-text-sec text-sm lg:text-base">
              No suggestions available
            </span>
          </div>
        ) : (
          whoToFollow?.data.map((user) => (
            <WhoToFollowCard
              key={user.userId}
              userId={user.userId}
              fullName={user.fullName}
              username={user.username}
              profilePic={user.profilePic}
            />
          ))
        )}
      </div>
      <div>
        <Link to="/connect-people">
          <span className="text-x-primary text-x-blue block px-4 py-3 text-sm hover:underline">
            Show more
          </span>
        </Link>
      </div>
    </div>
  );
};

export default WhoToFollow;
