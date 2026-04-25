import { useLocation } from "react-router";
import { useSearch } from "../../auth/hooks/useSearch";
import { useEffect } from "react";

const SearchHandler = () => {
  const location = useLocation();
  const { setSearchQuery } = useSearch();

  useEffect(() => {
    if (!location.pathname.startsWith("/explore")) {
      setSearchQuery("");
    }
  }, [location.pathname, setSearchQuery]);
  return null;
};

export default SearchHandler;
