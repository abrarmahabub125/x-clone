import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import InitialLoading from "../../../shared/loaders/InitialLoading";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <InitialLoading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
