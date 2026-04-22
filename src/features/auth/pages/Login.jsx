import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { fetcher } from "../../../../fetcher";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import Spinner from "../../../shared/loaders/Spinner";
import { loginSchema } from "../../../shared/validations/loginSchema.js";
import { useAuth } from "../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent py-2.5 px-3 lg:px-4 lg:py-3.5 text-sm  lg:text-base outline-none transition";

const errorClassName = "mt-1 text-sm text-red-500";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  const isFormValid =
    formData.email && formData.password && !errors.email && !errors.password;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);
    setSubmitMessage("");

    const result = loginSchema.safeParse(nextFormData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name]?.[0] || "",
      }));

      return;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      setErrors({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      await fetcher("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(result.data),
      });

      setSubmitMessage("Login successful! Redirecting...");
      setFormData({ email: "", password: "" });
      setErrors({ email: "", password: "" });

      await refetchUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      setSubmitMessage(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center gap-x-40 p-6 lg:flex-row lg:p-0">
      <div className="text-x-text mb-6 flex flex-col items-center gap-4 text-3xl font-semibold">
        <img
          className="mx-auto mb-4 h-8 w-8 object-contain lg:mb-6 lg:h-58 lg:w-58"
          src={XLogo}
          alt="logo"
        />
      </div>

      <div className="w-full max-w-sm space-y-3">
        <h1 className="text-x-text mb-8 text-center text-lg font-medium lg:text-3xl lg:font-semibold">
          Sign In
        </h1>
        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition lg:py-2.5 lg:text-[15px]">
          Sign in with Google
        </button>

        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition lg:py-2.5 lg:text-[15px]">
          Sign in with Apple
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="border-x-divider h-px flex-1 border-t" />
          <span className="text-x-text text-sm">or</span>
          <div className="border-x-divider h-px flex-1 border-t" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Email"
              className={`${inputClassName} ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className={errorClassName}>{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Password"
                className={`${inputClassName} ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer transition-colors duration-200 lg:right-4"
              >
                {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {errors.password && (
              <p className={errorClassName}>{errors.password}</p>
            )}
          </div>

          {submitMessage && (
            <p
              className={`text-sm font-medium ${
                submitMessage.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 lg:py-2.5 lg:text-base"
          >
            {isSubmitting ? <Spinner /> : "Login"}
          </button>
        </form>

        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition lg:py-2.5 lg:text-[15px]">
          Forgot password?
        </button>

        <div className="mt-6 text-center">
          <p className="text-x-text-sec text-sm lg:text-[15px]">
            Don&apos;t have an account?
          </p>
          <Link
            to="/register"
            className="border-x-divider text-x-blue hover:bg-x-surface mt-3 flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition lg:py-2.5 lg:text-[15px]"
          >
            Create account
          </Link>
        </div>

        <p className="text-x-text-sec mt-10 text-left text-[13px]">
          By signing in, you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
