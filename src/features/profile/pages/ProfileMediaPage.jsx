import { useState } from "react";
import ProfileTimeline from "../components/ProfileTimeline";
import { useEffect } from "react";
import { fetcher } from "../../../../fetcher";
import { useParams } from "react-router";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const ProfileMediaPage = () => {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        setLoading(true);
        const mediaData = await fetcher(`/api/users/${userId}/medias`);

        setMedias(mediaData.data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchMedias();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <ProfileTimeline
      posts={medias}
      emptyTitle="Nothing to show here yet."
      emptyDescription="Photos and videos shared from this account will appear here."
    />
  );
};

export default ProfileMediaPage;
