import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetcher } from "../../../../fetcher";
import Spinner from "../../loaders/Spinner";
import WhoToFollowCard from "./WhoToFollowCard";

const WhoToFollow = () => {
  const [whoToFollow, setWhoToFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhoToFollow = async () => {
      try {
        const response = await fetcher("/api/users/who-to-follow?limit=3", {
          method: "GET",
        });

        setWhoToFollow(response?.data ?? []);
      } catch (error) {
        console.error("Error fetching who to follow:", error);
        setWhoToFollow([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWhoToFollow();
  }, []);

  return (
    <div>
      <div>
        <div className="px-4 py-3">
          <div>
            <span className="text-x-text text-xl font-extrabold">
              Who to follow
            </span>
          </div>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-y-4 pb-3">
        {loading ? (
          <div className="flex min-h-44 items-center justify-center">
            <Spinner />
          </div>
        ) : whoToFollow.length === 0 ? (
          <div className="flex min-h-32 items-center justify-center">
            <span className="text-x-text-sec text-sm">
              No suggestions available
            </span>
          </div>
        ) : (
          whoToFollow.map((user) => (
            <WhoToFollowCard
              key={user.userId}
              userId={user.userId}
              fullName={user.fullName}
              username={user.username}
              profilePic={user.profilePic}
            />
          ))
        )}
      </div>
      <div>
        <Link to="/connect-people">
          <span className="text-x-primary text-x-blue block px-4 py-3 text-sm hover:underline">
            Show more
          </span>
        </Link>
      </div>
    </div>
  );
};

export default WhoToFollow;
