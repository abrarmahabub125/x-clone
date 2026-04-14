import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetcher } from "../../../../fetcher";
import { useAuth } from "../../auth/hooks/useAuth";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";
import ProfileTimeline from "../components/ProfileTimeline";

const ProfileLikesPage = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setLoading(true);
        const response = await fetcher(`/api/users/${userId}/likes`, {
          method: "GET",
        });

        setLikes(response?.data ?? []);
        setError(null);
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load likes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [userId]);

  if (loading) {
    return (
      <div className="px-6 py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <div className="pb-24">
      <ProfileTimeline
        posts={likes}
        removeOnUnlike={user?.id === userId}
        emptyTitle="No likes yet"
        emptyDescription="Posts liked by this account will be listed here."
      />
    </div>
  );
};

export default ProfileLikesPage;
