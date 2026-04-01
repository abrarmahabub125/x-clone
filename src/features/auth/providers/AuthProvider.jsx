import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  // fetch user data and authentication status here, and pass it down through the context
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/get-me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies for authentication
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
