import ExploreHeader from "../components/ExploreHeader";
import Spinner from "../../../shared/loaders/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { fetcher } from "../../../../fetcher";
import ForYou from "../components/ForYou";
import FetchError from "../../../shared/ui/FetchError";

const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetcher(
          `/api/explore/search?q=${encodeURIComponent(query)}`,
        );
        setResults(response);
        setError(null);
        setLoading(false);
      } catch (e) {
        setError(e.message || "Something went wrong!");
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div>
      <ExploreHeader query={query} setQuery={setQuery} />

      {error && <FetchError />}

      {loading ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        <div>
          <ForYou results={results.data} />
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
