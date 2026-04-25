import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export const useSearch = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return searchContext;
};
