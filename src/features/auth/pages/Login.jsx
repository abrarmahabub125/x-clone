import { Link } from "react-router";
import XLogo from "../../../shared/assets/logo/x-logo.svg";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent px-3 py-4 text-base outline-none transition";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Title */}
      <div className="text-x-text mb-6 flex items-center gap-4 text-center text-3xl font-semibold">
        Sign in to
        <img className="size-8" src={XLogo} alt="logo" />
      </div>

      {/* Social login buttons */}
      <div className="w-full max-w-md space-y-3">
        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-medium transition-colors duration-200">
          Sign in with Google
        </button>

        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200">
          Sign in with Apple
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="border-x-divider h-px flex-1 border-t" />
          <span className="text-x-text text-sm">or</span>
          <div className="border-x-divider h-px flex-1 border-t" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Email or username"
          className={inputClassName}
        />
        <input
          type="password"
          placeholder="Password"
          className={inputClassName}
        />

        {/* Next button */}
        <button className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[15px] font-bold transition-opacity duration-200 hover:opacity-95">
          Next
        </button>

        {/* Forgot password */}
        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200">
          Forgot password?
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-x-text-sec text-[15px] leading-6">
            Don&apos;t have an account?
          </p>
          <Link
            className="border-x-divider text-x-blue hover:bg-x-surface mt-2 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200"
            to="/register"
          >
            Create account
          </Link>
        </div>

        {/* Terms */}
        <p className="text-x-text-sec mt-10 text-center text-[13px] leading-5">
          By signing in, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
