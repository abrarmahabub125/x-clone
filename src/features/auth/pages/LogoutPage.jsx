import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LogoutPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(false);
    navigate("/login", { replace: true });
  }, [navigate, setUser]);

  return <div className="p-4">Signing out...</div>;
};

export default LogoutPage;
