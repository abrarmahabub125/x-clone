import { Link, useNavigate } from "react-router";
import { useState } from "react";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../hooks/useAuth";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent px-3 py-4 text-base outline-none transition";

const SignUpPage = () => {
  const { startOtpVerification } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
    setErrorText("");
  };

  const handleSignUp = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setErrorText("Please fill in all fields before continuing.");
      return;
    }

    const pendingOtp = startOtpVerification(formData);

    navigate("/signup/verify", {
      replace: true,
      state: {
        email: pendingOtp.email,
        debugOtp: pendingOtp.otp,
      },
    });
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
        <button
          type="button"
          className="border-x-divider text-x-text flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 hover:bg-x-surface"
        >
          Sign up with Google
        </button>

        <button
          type="button"
          className="border-x-divider text-x-text flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200 hover:bg-x-surface"
        >
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
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={inputClassName}
          />
        </div>

        {errorText && <p className="text-sm text-red-400">{errorText}</p>}

        <button
          type="button"
          onClick={handleSignUp}
          className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[15px] font-bold transition-opacity duration-200 hover:opacity-95"
        >
          Continue to OTP verification
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
