import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import ProfileTimeline from "../components/ProfileTimeline";

const ProfilePostsPage = () => {
  const { userId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile-posts", userId],
    queryFn: () =>
      axiosInstance.get(`/users/${userId}/posts`).then((res) => res.data),
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
    return <FetchError message={isError} />;
  }

  return (
    <div className="pb-24">
      <ProfileTimeline posts={data.data} />
    </div>
  );
};

export default ProfilePostsPage;
