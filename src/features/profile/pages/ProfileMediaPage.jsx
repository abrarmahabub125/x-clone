import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import ProfileTimeline from "../components/ProfileTimeline";

// /api/users/${userId}/medias

const ProfileMediaPage = () => {
  const { userId } = useParams();
  const {
    data: medias,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profileMedias", userId],
    queryFn: () =>
      axiosInstance.get(`/users/${userId}/medias`).then((res) => res.data),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <FetchError message={error} />;
  }

  return (
    <ProfileTimeline
      posts={medias.data}
      emptyTitle="Nothing to show here yet."
      emptyDescription="Photos and videos shared from this account will appear here."
    />
  );
};

export default ProfileMediaPage;
