import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../../../shared/loaders/Spinner";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
