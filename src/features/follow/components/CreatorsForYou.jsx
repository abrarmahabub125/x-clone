import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";
import { useState } from "react";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const CreatorsForYou = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching suggestions from an API
  useState(() => {
    fetch("http://localhost:3000/api/users/creators", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
    })
      .then((response) => response.json())
      .then((data) => {
        setCreators(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        setError("Failed to load creators. Please try again.");
        setLoading(false);
      });
  }, []);

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <div>
      <FollowSectionHeader
        title="Creators for you"
        subtitle="Popular creators in design, frontend, and product conversations"
      />

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : (
        creators.map((creator) => (
          <FollowSuggestionCard key={creator.id} {...creator} />
        ))
      )}
    </div>
  );
};

export default CreatorsForYou;
