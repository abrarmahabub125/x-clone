import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const user = null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
