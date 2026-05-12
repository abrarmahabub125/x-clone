import { useCallback, useEffect, useState } from "react";
import { fetcher } from "../../../../fetcher";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
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
      // 401 is expected when user is not logged in - don't log it
      if (error?.status !== 401) {
        console.error("Error fetching user data:", error?.message || error);
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
