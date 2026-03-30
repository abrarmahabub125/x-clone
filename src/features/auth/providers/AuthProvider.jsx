import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: true,
        });
        const result = await response.json();

        if (result.success) {
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  console.log(user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
