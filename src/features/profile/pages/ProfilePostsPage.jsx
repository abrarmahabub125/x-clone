import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetcher } from "../../../../fetcher";
import ProfileTimeline from "../components/ProfileTimeline";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const ProfilePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetcher(`/api/users/${userId}/posts`, {
          method: "GET",
        });

        setPosts(response?.data ?? []);
        setError(null);
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
      <ProfileTimeline posts={posts} />
    </div>
  );
};

export default ProfilePostsPage;

