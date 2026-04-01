import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import Spinner from "../../../shared/loaders/Spinner";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  // ================= OTP INPUT =================
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, "");

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const newOtp = [...otpDigits];
      newOtp[index - 1] = "";
      setOtpDigits(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  // ================= PASTE SUPPORT =================
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedData) return;

    const digits = pastedData.slice(0, OTP_LENGTH).split("");

    const newOtp = Array(OTP_LENGTH).fill("");
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtpDigits(newOtp);

    const lastIndex = digits.length - 1;
    if (lastIndex >= 0) {
      inputRefs.current[lastIndex].focus();
    }
  };

  // ================= SUBMIT =================
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

      const response = await fetch(
        "http://localhost:3000/api/auth/verify-otp",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ OTP: enteredOtp }),
        },
      );

      const data = await response.json();

      setResponseMessage({
        success: data.status,
        message: data.message,
      });

      if (data.status) {
        setOtpDigits(Array(OTP_LENGTH).fill(""));

        setTimeout(() => {
          navigate("/login");
        }, 500);
      }

      // auto clear message
      setTimeout(() => setResponseMessage(null), 500);
    } catch (err) {
      console.error(err);

      setResponseMessage({
        success: false,
        message: "Something went wrong. Try again.",
      });

      setTimeout(() => setResponseMessage(null), 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex h-screen w-full items-center justify-center gap-x-40">
      {/* Logo */}
      <div>
        <img
          src={XLogo}
          alt="Twitter Logo"
          className="mx-auto mb-6 h-52 w-52 object-contain"
        />
      </div>

      {/* OTP Card */}
      <div className="max-w-md space-y-5">
        <div className="border-x-divider from-x-surface to-x-bg rounded-2xl border bg-linear-to-b p-5">
          <p className="text-x-text-sec text-sm leading-6">
            We sent a 6-digit security code to your email. Please enter the code
            below to verify your account.
          </p>

          <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
            {/* OTP Inputs */}
            <div
              className="grid grid-cols-6 gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
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

            {/* Timer */}
            <div className="border-x-divider flex items-center justify-between rounded-xl border px-3 py-2">
              <span className="text-x-text-sec text-sm">
                Code expires in 10 minutes.
              </span>
            </div>

            {/* Messages */}
            {responseMessage && (
              <p
                className={`text-sm font-medium ${
                  responseMessage.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {responseMessage.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-x-bgOpposite text-x-textOpposite flex w-full items-center justify-center rounded-full px-4 py-3 text-[15px] font-bold transition-opacity duration-200 hover:opacity-95 disabled:opacity-60"
            >
              {isSubmitting ? <Spinner /> : "Verify and continue"}
            </button>

            {/* Resend */}
            <button
              type="button"
              className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-semibold transition-colors duration-200"
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
