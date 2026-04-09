import { useState } from "react";
import ProfileTimeline from "../components/ProfileTimeline";
import { useEffect } from "react";
import { fetcher } from "../../../../fetcher";
import { useAuth } from "../../auth/hooks/useAuth";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const ProfileMediaPage = () => {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useAuth().user;

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const mediaData = await fetcher(`/api/users/${id}/medias`);

        setMedias(mediaData.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
    };

    fetchMedias();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <FetchError />;
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
