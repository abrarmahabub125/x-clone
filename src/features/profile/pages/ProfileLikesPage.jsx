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

  ///users/${userId}/likes

  const {
    data: likes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile-likes", userId],
    queryFn: () =>
      axiosInstance.get(`/users/${userId}/likes`).then((res) => res.data),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="px-6 py-12">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <FetchError message={error} />;
  }

  return (
    <div className="pb-24">
      <ProfileTimeline
        posts={likes.data}
        removeOnUnlike={user?.id === userId}
        emptyTitle="No likes yet"
        emptyDescription="Posts liked by this account will be listed here."
        onDeletePost={onOwnPostDeleted}
      />
    </div>
  );
};

export default ProfileLikesPage;
