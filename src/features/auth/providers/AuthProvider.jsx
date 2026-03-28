import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const readStoredUser = () => {
  try {
    return localStorage.getItem("x-user") === "1";
  } catch {
    return false;
  }
};

const persistUser = (value) => {
  try {
    if (value) {
      localStorage.setItem("x-user", "1");
      return;
    }

    localStorage.removeItem("x-user");
  } catch {
    // Ignore storage failures and keep auth state in memory.
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const updateUser = (value) => {
    setUser(value);
    persistUser(value);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
