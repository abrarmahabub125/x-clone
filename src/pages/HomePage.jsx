import { useState } from "react";
import HomeHeader from "../components/HomeFeedComponents/HomeHeader";
import NewsFeed from "../components/HomeFeedComponents/NewsFeed";
import FollowingFeed from "../components/HomeFeedComponents/FollowingFeed";
import CreateTweet from "../components/HomeFeedComponents/CreateTweet";

const HomePage = () => {
  const [isForYouActive, setForYouActive] = useState("for_you");

  return (
    <div>
      <HomeHeader isActive={isForYouActive} setActive={setForYouActive} />
      <div>
        <CreateTweet />
        {isForYouActive === "for_you" ? <NewsFeed /> : <FollowingFeed />}
      </div>
    </div>
  );
};

export default HomePage;
