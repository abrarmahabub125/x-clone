import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../hooks/useAuth";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent px-3 py-4 text-base outline-none transition";

const LoginPage = () => {
  const { login, isAuthLoading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const fromPath = location.state?.from?.pathname || "/";

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
    setFormError("");
  };

  const handleLogin = async () => {
    if (!credentials.identifier.trim() || !credentials.password.trim()) {
      setFormError("Please enter your email/username and password.");
      return;
    }

    const loginResult = await login(credentials);

    if (!loginResult.ok) {
      setFormError(loginResult.error || "Unable to sign in right now.");
      return;
    }

    navigate(fromPath, { replace: true });
  };

  const activeError = formError || authError;

  return (
    <AuthShell
      title="Sign in to X"
      footer={
        <div>
          <p className="text-x-text-sec text-[15px] leading-6">
            Don&apos;t have an account?
          </p>
          <Link
            className="border-x-divider text-x-blue hover:bg-x-surface mt-4 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200"
            to="/signup"
          >
            Create account
          </Link>
        </div>
      }
    >
      <div className="space-y-3">
        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-medium transition-colors duration-200">
          Sign in with Google
        </button>

        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200">
          Sign in with Apple
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="border-x-divider h-px flex-1 border-t" />
          <span className="text-x-text text-sm">or</span>
          <div className="border-x-divider h-px flex-1 border-t" />
        </div>

        <div className="flex flex-col gap-y-4">
          <input
            type="text"
            name="identifier"
            value={credentials.identifier}
            onChange={handleInputChange}
            placeholder="Email or username"
            className={inputClassName}
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Password"
            className={inputClassName}
            autoComplete="current-password"
          />
        </div>

        {activeError && <p className="text-sm text-red-400">{activeError}</p>}

        <button
          onClick={handleLogin}
          disabled={isAuthLoading}
          className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[15px] font-bold transition-opacity duration-200 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isAuthLoading ? "Signing in..." : "Next"}
        </button>

        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200">
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
