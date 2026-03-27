import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("x-user") === "1");

  const updateUser = (value) => {
    setUser(value);

    if (value) {
      localStorage.setItem("x-user", "1");
      return;
    }

    localStorage.removeItem("x-user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
