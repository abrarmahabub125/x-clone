import WhoToFollowCard from "./WhoToFollowCard";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../../loaders/Spinner";

const WhoToFollow = () => {
  const [whoToFollow, setWhoToFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhoToFollow = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/who-to-follow",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await response.json();
        setWhoToFollow(data);
      } catch (error) {
        console.error("Error fetching who to follow:", error);
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
