import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    setUser(true);
    navigate(fromPath, { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="border-x-divider w-full max-w-sm rounded-2xl border p-6">
        <h1 className="text-x-text text-xl font-semibold">Login</h1>
        <p className="text-x-text-sec mt-1 text-sm">
          Sign in to continue.
        </p>
        <button
          onClick={handleLogin}
          className="bg-x-bgOpposite text-x-textOpposite mt-6 w-full rounded-full px-4 py-2.5 text-sm font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
