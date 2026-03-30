import { useRef, useState } from "react";
import { Link } from "react-router";
import AuthShell from "../components/AuthShell";

const OTP_LENGTH = 6;

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  // 🔹 Handle change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move next
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // 🔹 Handle key (backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  // 🔹 Handle paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((_, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = newOtp[i];
      }
    });
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("OTP:", finalOtp);

    // 👉 API call here
  };

  return (
    <AuthShell
      title="Verify your email"
      footer={
        <div className="space-y-2">
          <p className="text-x-text-sec text-[15px] leading-6">
            Used a wrong email?
          </p>
          <Link
            className="text-x-blue text-sm font-semibold hover:underline"
            to="/signup"
          >
            Back to sign up
          </Link>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="border-x-divider from-x-surface to-x-bg rounded-2xl border bg-gradient-to-b p-5">
          <p className="text-x-text-sec text-sm leading-6">
            We sent a 6-digit security code to
            <span className="text-x-text ml-1 font-semibold">
              abrarmahabub@gmail.com
            </span>
            .
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            {/* 🔥 OTP INPUTS */}
            <div
              className="grid grid-cols-6 gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="text-x-text border-x-divider focus:border-x-blue h-14 w-full rounded-xl border bg-transparent text-center text-2xl font-bold transition-all duration-200 outline-none"
                />
              ))}
            </div>

            {/* TIMER */}
            <div className="border-x-divider flex items-center justify-between rounded-xl border px-3 py-2">
              <span className="text-x-text-sec text-sm">Code expires in</span>
              <span className="text-x-text font-mono text-sm font-semibold">
                5:00
              </span>
            </div>

            <button
              type="submit"
              className="bg-x-bgOpposite text-x-textOpposite flex w-full items-center justify-center rounded-full px-4 py-3 text-[15px] font-bold"
            >
              Verify and continue
            </button>

            <button
              type="button"
              className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-semibold"
            >
              Resend OTP
            </button>
          </form>
        </div>
      </div>
    </AuthShell>
  );
};

export default VerifyOtpPage;
