import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
