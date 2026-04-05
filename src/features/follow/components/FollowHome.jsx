import { useState } from "react";
import FollowSectionHeader from "./FollowSectionHeader";
import FollowSuggestionCard from "./FollowSuggestionCard";
import Spinner from "../../../shared/loaders/Spinner";
import FetchError from "../../../shared/ui/FetchError";

const FollowHome = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching suggestions from an API
  useState(() => {
    fetch("http://localhost:3000/api/users/connect", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
    })
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        setError("Failed to load suggestions. Please try again.");
        setLoading(false);
      });
  }, []);

  if (error) {
    return <FetchError message={error} />;
  }

  return (
    <div>
      <FollowSectionHeader
        title="Suggested for you"
        subtitle="Accounts you might want to follow based on product, design, and frontend interests"
      />

      <div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          suggestions.map((profile) => (
            <FollowSuggestionCard key={profile._id} {...profile} />
          ))
        )}
      </div>
    </div>
  );
};

export default FollowHome;
