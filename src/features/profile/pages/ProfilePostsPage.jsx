import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
        const userPosts = await fetch(
          `http://localhost:3000/api/users/${userId}/posts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        const data = await userPosts.json();
        setPosts(data.posts);
        setError(null);
      } catch (e) {
        setError(e.message || "Failed to load posts. Please try again.");
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
