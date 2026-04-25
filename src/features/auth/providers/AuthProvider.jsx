import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetcher } from "../../../../fetcher";

const AuthProvider = ({ children }) => {
  // fetch user data and authentication status here, and pass it down through the context
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetcher("/api/auth/get-me", {
        method: "GET",
      });
      setUser(response?.data?.user ?? null);
    } catch (error) {
      // Don't log error for 401 (not authenticated) - this is expected
      if (error?.status !== 401) {
        console.error("Error fetching user data:", error);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, refetchUser: fetchUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
