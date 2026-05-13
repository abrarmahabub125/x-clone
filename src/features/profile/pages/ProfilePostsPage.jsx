import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router";

import { axiosInstance } from "../../../shared/lib/axiosInstance";

import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

import ProfileTimeline from "../components/ProfileTimeline";

const ProfilePostsPage = () => {
  const { userId } = useParams();
  const { onOwnPostDeleted } = useOutletContext();

  const { data, isLoading, isError, error, isFetching, isRefetching } =
    useQuery({
      queryKey: ["profile-posts", userId],

      queryFn: async () => {
        const res = await axiosInstance.get(`/users/${userId}/posts`);

        return res.data;
      },

      // Data 5 min fresh thakbe
      staleTime: 1000 * 60 * 5,

      // Window focus korle background refetch
      refetchOnWindowFocus: true,

      // Internet reconnect hole refetch
      refetchOnReconnect: true,

      // Every 15 sec background fetch
      refetchInterval: 15000,
    });

  // First loading
  if (isLoading) {
    return (
      <div className="px-6 py-12">
        <Spinner />
      </div>
    );
  }

  // Error state
  if (isError) {
    return <FetchError message={error?.message} />;
  }

  return (
    <div className="pb-24">
      {/* Background Fetch Indicator */}
      {(isFetching || isRefetching) && (
        <div className="px-6 py-2">
          <p className="text-x-text-sec text-sm">Refreshing posts...</p>
        </div>
      )}

      <ProfileTimeline
        posts={data?.data || []}
        onDeletePost={onOwnPostDeleted}
      />
    </div>
  );
};

export default ProfilePostsPage;
