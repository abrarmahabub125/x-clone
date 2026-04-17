import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { fetcher } from "../../../../fetcher";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import Spinner from "../../../shared/loaders/Spinner";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, "");
    const nextOtp = [...otpDigits];

    nextOtp[index] = value;
    setOtpDigits(nextOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const nextOtp = [...otpDigits];

      nextOtp[index - 1] = "";
      setOtpDigits(nextOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedDigits = e.clipboardData.getData("text").replace(/\D/g, "");

    if (!pastedDigits) {
      return;
    }

    const nextOtp = Array(OTP_LENGTH).fill("");
    pastedDigits
      .slice(0, OTP_LENGTH)
      .split("")
      .forEach((digit, index) => {
        nextOtp[index] = digit;
      });

    setOtpDigits(nextOtp);
    inputRefs.current[Math.min(pastedDigits.length, OTP_LENGTH) - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otpDigits.join("");

    if (enteredOtp.length !== OTP_LENGTH) {
      setResponseMessage({
        success: false,
        message: "Please enter the complete OTP.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setResponseMessage(null);

      const response = await fetcher("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ OTP: enteredOtp }),
      });

      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setResponseMessage({
        success: true,
        message: response.message,
      });

      setTimeout(() => {
        navigate("/login");
      }, 500);

      setTimeout(() => setResponseMessage(null), 1500);
    } catch (error) {
      console.error(error);
      setResponseMessage({
        success: false,
        message: error.message || "Something went wrong. Try again.",
      });

      setTimeout(() => setResponseMessage(null), 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center gap-x-40 p-5 lg:flex-row">
      <div>
        <img
          src={XLogo}
          alt="Twitter Logo"
          className="mx-auto mb-4 h-8 w-8 object-contain lg:mb-6 lg:h-58 lg:w-58"
        />
      </div>

      <div className="max-w-md space-y-5">
        <h1 className="text-x-text mb-8 text-center text-lg font-medium lg:text-3xl lg:font-semibold">
          Verify E-mail
        </h1>
        <div className="border-x-divider from-x-surface to-x-bg rounded-2xl border bg-linear-to-b p-5">
          <p className="text-x-text-sec text-sm leading-6">
            We sent a 6-digit security code to your email. Please enter the code
            below to verify your account.
          </p>

          <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
            <div
              className="grid grid-cols-6 gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="text-x-text border-x-divider focus:border-x-blue focus:bg-x-surface h-14 w-full rounded-xl border bg-transparent text-center text-2xl font-bold transition-all duration-200 outline-none focus:shadow-[0_0_0_2px_rgba(29,155,240,0.35)]"
                />
              ))}
            </div>

            <div className="border-x-divider flex items-center justify-between rounded-xl border px-3 py-2">
              <span className="text-x-text-sec text-sm">
                Code expires in 10 minutes.
              </span>
            </div>

            {responseMessage && (
              <p
                className={`text-sm font-medium ${
                  responseMessage.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {responseMessage.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-x-bgOpposite text-x-textOpposite flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-opacity duration-200 hover:opacity-95 disabled:opacity-60 lg:py-3 lg:text-[15px] lg:font-bold"
            >
              {isSubmitting ? <Spinner /> : "Verify and continue"}
            </button>

            <button
              type="button"
              className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 lg:py-2.5 lg:text-[15px]"
            >
              Resend OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
