import { Link, useLocation, useNavigate } from "react-router";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../hooks/useAuth";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent px-3 py-4 text-base outline-none transition";

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
    <AuthShell
      title="Sign in to X"
      footer={
        <div>
          <p className="text-x-text-sec text-[15px] leading-6">
            Don&apos;t have an account?
          </p>
          <Link
            className="border-x-divider text-x-blue mt-4 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200 hover:bg-x-surface"
            to="/signup"
          >
            Create account
          </Link>
        </div>
      }
    >
      <div className="space-y-3">
        <button className="border-x-divider text-x-text flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 hover:bg-x-surface">
          Sign in with Google
        </button>

        <button className="border-x-divider text-x-text flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200 hover:bg-x-surface">
          Sign in with Apple
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="border-x-divider h-px flex-1 border-t" />
          <span className="text-x-text text-sm">or</span>
          <div className="border-x-divider h-px flex-1 border-t" />
        </div>

        <div>
          <input
            type="text"
            placeholder="Phone, email, or username"
            className={inputClassName}
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[15px] font-bold transition-opacity duration-200 hover:opacity-95"
        >
          Next
        </button>

        <button className="border-x-divider text-x-text flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200 hover:bg-x-surface">
          Forgot password?
        </button>
      </div>

      <p className="text-x-text-sec mt-10 text-[13px] leading-5">
        By signing in, you agree to the Terms of Service and Privacy Policy,
        including Cookie Use.
      </p>
    </AuthShell>
  );
};

export default LoginPage;
