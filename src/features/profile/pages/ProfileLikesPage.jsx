import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router";

import { axiosInstance } from "../../../shared/lib/axiosInstance";

import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

import { useAuth } from "../../auth/hooks/useAuth";

import ProfileTimeline from "../components/ProfileTimeline";

const ProfileLikesPage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { onOwnPostDeleted } = useOutletContext();

  // /users/${userId}/likes

  const {
    data: likes,
    isLoading,
    isError,
    error,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["profile-likes", userId],

    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${userId}/likes`);

      return res.data;
    },

    // Cache fresh for 5 minutes
    staleTime: 1000 * 60 * 5,

    // Refetch when tab gets focus
    refetchOnWindowFocus: true,

    // Refetch when internet reconnects
    refetchOnReconnect: true,

    // Background fetch every 15 seconds
    refetchInterval: 15000,
  });

  // Initial loading
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
          <p className="text-x-text-sec text-sm">Refreshing liked posts...</p>
        </div>
      )}

      <ProfileTimeline
        posts={likes?.data || []}
        removeOnUnlike={user?.id === userId}
        emptyTitle="No likes yet"
        emptyDescription="Posts liked by this account will be listed here."
        onDeletePost={onOwnPostDeleted}
      />
    </div>
  );
};

export default ProfileLikesPage;
