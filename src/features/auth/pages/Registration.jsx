import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { fetcher } from "../../../../fetcher";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import Spinner from "../../../shared/loaders/Spinner";
import { registerSchema } from "../../../shared/validations/registerSchema";

const inputClassName =
  "border-x-divider text-x-text placeholder:text-x-text-sec focus:border-x-blue w-full rounded-md border bg-transparent py-2.5 px-3 lg:px-4 lg:py-3.5 text-sm  lg:text-base outline-none transition";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const isEmpty = !formData.fullName || !formData.email || !formData.password;

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
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center gap-x-40 p-6 lg:flex-row lg:p-0">
      <div>
        <img
          src={XLogo}
          alt="Twitter Logo"
          className="mx-auto mb-4 h-8 w-8 object-contain lg:mb-6 lg:h-58 lg:w-58"
        />
      </div>

      <div className="w-full max-w-sm">
        <h1 className="text-x-text mb-8 text-center text-lg font-medium lg:text-3xl lg:font-semibold">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <button
            type="button"
            className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition lg:py-2.5 lg:text-[15px]"
          >
            Sign up with Google
          </button>

          <button
            type="button"
            className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition lg:py-2.5 lg:text-[15px]"
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
            <p className="mt-1 text-xs text-red-500 lg:text-sm">
              {getError("fullName")}
            </p>
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
            <p className="mt-1 text-xs text-red-500 lg:text-sm">
              {getError("email")}
            </p>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
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
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 lg:right-4"
              >
                O
              </span>
            </div>
            <p className="mt-1 text-xs text-red-500 lg:text-sm">
              {getError("password")}
            </p>
          </div>

          {submitMessage && (
            <p className="text-sm text-red-500">{submitMessage}</p>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting ||
              isEmpty ||
              getError("fullName") ||
              getError("email") ||
              getError("password")
            }
            className="bg-x-bgOpposite text-x-textOpposite mt-2 flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 lg:py-2.5 lg:text-base"
          >
            {isSubmitting ? <Spinner /> : "Continue"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-x-text-sec text-sm leading-6 lg:text-[15px]">
            Already have an account?
          </p>
          <Link
            className="border-x-divider text-x-blue hover:bg-x-surface mt-2 inline-flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200 lg:py-2.5 lg:text-[15px]"
            to="/login"
          >
            Login
          </Link>
        </div>

        <p className="text-x-text-sec mt-5 text-xs leading-5 lg:text-[13px]">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>
      </div>
    </div>
  );
};

export default Registration;
