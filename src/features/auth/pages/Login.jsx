import { Link } from "react-router";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import { useState } from "react";
import Spinner from "../../../shared/loaders/Spinner";
import { loginSchema } from "../../../shared/validations/loginSchema.js";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent px-3 py-4 text-base outline-none transition";

const errorClassName = "text-red-500 text-sm mt-1";

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

  // ✅ Check form validity
  const isFormValid =
    formData.email && formData.password && !errors.email && !errors.password;

  // 🔹 Handle input change + validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);
    setSubmitMessage("");

    // 🔥 validate full schema but extract field error
    const result = loginSchema.safeParse(updatedData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name]?.[0] || "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Full validation before API
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      setErrors({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
      });

      return; // ❌ block submit
    }

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (data.status) {
        setSubmitMessage("Login successful! Redirecting...");
        setFormData({ email: "", password: "" });
        setErrors({ email: "", password: "" });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setSubmitMessage(data.message || "Login failed. Try again.");
        setTimeout(() => setSubmitMessage(""), 3000);
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Title */}
      <div className="text-x-text mb-6 flex items-center gap-4 text-3xl font-semibold">
        Sign in to
        <img className="size-8" src={XLogo} alt="logo" />
      </div>

      <div className="w-full max-w-md space-y-3">
        {/* Social buttons */}
        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-medium transition">
          Sign in with Google
        </button>

        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition">
          Sign in with Apple
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="border-x-divider h-px flex-1 border-t" />
          <span className="text-x-text text-sm">or</span>
          <div className="border-x-divider h-px flex-1 border-t" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
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

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Password"
              className={`${inputClassName} ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className={errorClassName}>{errors.password}</p>
            )}
          </div>

          {/* 🔥 Global Message */}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[15px] font-bold transition hover:opacity-95 disabled:opacity-70"
          >
            {isSubmitting ? <Spinner /> : "Login"}
          </button>
        </form>

        {/* Forgot password */}
        <button className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition">
          Forgot password?
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-x-text-sec text-[15px]">
            Don&apos;t have an account?
          </p>
          <Link
            to="/register"
            className="border-x-divider text-x-blue hover:bg-x-surface mt-2 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition"
          >
            Create account
          </Link>
        </div>

        {/* Terms */}
        <p className="text-x-text-sec mt-10 text-center text-[13px]">
          By signing in, you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
