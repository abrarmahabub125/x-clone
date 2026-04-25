import { useState } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
