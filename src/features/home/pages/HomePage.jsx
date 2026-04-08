import { useLocation, useNavigate } from "react-router";
import HomeHeader from "../components/HomeHeader";
import NewsFeed from "../components/NewsFeed";
import FollowingFeed from "../components/FollowingFeed";
import CreateTweet from "../components/CreateTweet";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab =
    location.pathname === "/following" ? "following" : "for_you";

  const handleTabChange = (tab) => {
    navigate(tab === "following" ? "/following" : "/");
  };

  return (
    <div>
      <HomeHeader isActive={activeTab} setActive={handleTabChange} />
      <div>
        {activeTab === "for_you" && <CreateTweet />}
        {activeTab === "for_you" ? <NewsFeed /> : <FollowingFeed />}
      </div>
    </div>
  );
};

export default HomePage;
