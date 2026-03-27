import { Link, useNavigate } from "react-router";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../hooks/useAuth";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent px-3 py-4 text-base outline-none transition";

const SignUpPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    setUser(true);
    navigate("/", { replace: true });
  };

  return (
    <AuthShell
      title="Create your account"
      footer={
        <div>
          <p className="text-x-text-sec text-[15px] leading-6">
            Already have an account?
          </p>
          <Link
            className="border-x-divider text-x-blue mt-4 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200 hover:bg-x-surface"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      }
    >
      <div className="space-y-3">
        <button className="border-x-divider text-x-text flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 hover:bg-x-surface">
          Sign up with Google
        </button>

        <button className="border-x-divider text-x-text flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200 hover:bg-x-surface">
          Sign up with Apple
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="border-x-divider h-px flex-1 border-t" />
          <span className="text-x-text text-sm">or</span>
          <div className="border-x-divider h-px flex-1 border-t" />
        </div>

        <div>
          <input
            type="text"
            placeholder="Name"
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={inputClassName}
          />
        </div>

        <button
          onClick={handleSignUp}
          className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[15px] font-bold transition-opacity duration-200 hover:opacity-95"
        >
          Create account
        </button>
      </div>

      <p className="text-x-text-sec mt-10 text-[13px] leading-5">
        By signing up, you agree to the Terms of Service and Privacy Policy,
        including Cookie Use.
      </p>
    </AuthShell>
  );
};

export default SignUpPage;
