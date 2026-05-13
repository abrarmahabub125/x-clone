import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router";

import { axiosInstance } from "../../../shared/lib/axiosInstance";

import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

import ProfileTimeline from "../components/ProfileTimeline";

// /api/users/${userId}/medias

const ProfileMediaPage = () => {
  const { userId } = useParams();
  const { onOwnPostDeleted } = useOutletContext();

  const {
    data: medias,
    isLoading,
    isError,
    error,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["profileMedias", userId],

    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${userId}/medias`);

      return res.data;
    },

    // Cache fresh for 5 min
    staleTime: 1000 * 60 * 5,

    // Refetch when window focused
    refetchOnWindowFocus: true,

    // Refetch when internet reconnects
    refetchOnReconnect: true,

    // Background fetch every 15 sec
    refetchInterval: 15000,
  });

  // Initial loading
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
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
          <p className="text-x-text-sec text-sm">Refreshing media posts...</p>
        </div>
      )}

      <ProfileTimeline
        posts={medias?.data || []}
        emptyTitle="Nothing to show here yet."
        emptyDescription="Photos and videos shared from this account will appear here."
        onDeletePost={onOwnPostDeleted}
      />
    </div>
  );
};

export default ProfileMediaPage;
