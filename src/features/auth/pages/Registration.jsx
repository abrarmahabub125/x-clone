import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { fetcher } from "../../../../fetcher";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import Spinner from "../../../shared/loaders/Spinner";
import { registerSchema } from "../../../shared/validations/registerSchema";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent px-4 py-3.5 text-base outline-none transition";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitMessage("");

    const fieldSchema = registerSchema.shape[name];
    const result = fieldSchema.safeParse(value);

    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors };

      if (!result.success) {
        nextErrors[name] = [result.error.issues[0].message];
      } else {
        delete nextErrors[name];
      }

      return nextErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      await fetcher("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(result.data),
      });

      setErrors({});
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });

      navigate("/registration/verify-email", { replace: true });
    } catch (error) {
      console.log(error);
      setSubmitMessage(
        error.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getError = (field) => errors[field]?.[0];

  return (
    <div className="fixed top-0 left-0 flex h-screen w-full items-center justify-center gap-x-40">
      <div>
        <img
          src={XLogo}
          alt="Twitter Logo"
          className="mx-auto mb-6 h-64 w-64 object-contain"
        />
      </div>

      <div>
        <h1 className="text-x-text mb-8 text-center text-3xl font-semibold">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <button
            type="button"
            className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-medium transition"
          >
            Sign up with Google
          </button>

          <button
            type="button"
            className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition"
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
              name="fullName"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Name"
              className={inputClassName}
            />
            <p className="mt-1 text-sm text-red-500">{getError("fullName")}</p>
          </div>

          <div>
            <input
              type="email"
              name="email"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={inputClassName}
            />
            <p className="mt-1 text-sm text-red-500">{getError("email")}</p>
          </div>

          <div>
            <input
              type="password"
              name="password"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className={inputClassName}
            />
            <p className="mt-1 text-sm text-red-500">{getError("password")}</p>
          </div>

          {submitMessage && (
            <p className="text-sm text-red-500">{submitMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-base font-bold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? <Spinner /> : "Continue"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-x-text-sec text-[15px] leading-6">
            Already have an account?
          </p>
          <Link
            className="border-x-divider text-x-blue hover:bg-x-surface mt-2 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors duration-200"
            to="/login"
          >
            Login
          </Link>
        </div>

        <p className="text-x-text-sec mt-10 text-[13px] leading-5">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>
      </div>
    </div>
  );
};

export default Registration;
