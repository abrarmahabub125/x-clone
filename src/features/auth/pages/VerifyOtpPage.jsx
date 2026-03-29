import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../hooks/useAuth";

const OTP_LENGTH = 6;

const createEmptyOtp = () => Array.from({ length: OTP_LENGTH }, () => "");

const maskEmail = (email) => {
  const [name, domain] = email.split("@");

  if (!domain) {
    return email;
  }

  const visibleNamePart = name.slice(0, 2);
  const hiddenNamePart = "*".repeat(Math.max(0, name.length - visibleNamePart.length));

  return `${visibleNamePart}${hiddenNamePart}@${domain}`;
};

const VerifyOtpPage = () => {
  const { pendingOtp, verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [otpDigits, setOtpDigits] = useState(createEmptyOtp);
  const [errorText, setErrorText] = useState("");
  const [infoText, setInfoText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(() => {
    if (!pendingOtp) {
      return 0;
    }

    return Math.max(0, Math.ceil((pendingOtp.expiresAt - Date.now()) / 1000));
  });
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (!pendingOtp) {
      return undefined;
    }

    const updateSeconds = () => {
      setSecondsLeft(Math.max(0, Math.ceil((pendingOtp.expiresAt - Date.now()) / 1000)));
    };

    updateSeconds();
    const timerId = setInterval(updateSeconds, 1000);

    return () => clearInterval(timerId);
  }, [pendingOtp]);

  if (!pendingOtp) {
    return <Navigate to="/signup" replace />;
  }

  const visibleEmail = location.state?.email || pendingOtp.email;
  const debugOtp = location.state?.debugOtp || pendingOtp.otp;

  const setOtpAtIndex = (index, value) => {
    setOtpDigits((currentOtpDigits) => {
      const nextOtpDigits = [...currentOtpDigits];
      nextOtpDigits[index] = value;
      return nextOtpDigits;
    });
  };

  const handleInputChange = (index, event) => {
    const numericValue = event.target.value.replace(/\D/g, "");

    if (!numericValue) {
      setOtpAtIndex(index, "");
      return;
    }

    const incomingDigits = numericValue.slice(0, OTP_LENGTH).split("");

    setOtpDigits((currentOtpDigits) => {
      const nextOtpDigits = [...currentOtpDigits];
      let cursor = index;

      incomingDigits.forEach((digit) => {
        if (cursor < OTP_LENGTH) {
          nextOtpDigits[cursor] = digit;
          cursor += 1;
        }
      });

      return nextOtpDigits;
    });

    const focusIndex = Math.min(index + incomingDigits.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();

    setErrorText("");
    setInfoText("");
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      setOtpAtIndex(index - 1, "");
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedDigits) {
      return;
    }

    const nextOtpDigits = createEmptyOtp();
    pastedDigits.split("").forEach((digit, index) => {
      nextOtpDigits[index] = digit;
    });

    setOtpDigits(nextOtpDigits);
    inputRefs.current[Math.max(0, pastedDigits.length - 1)]?.focus();

    setErrorText("");
    setInfoText("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const otpCode = otpDigits.join("");

    if (otpCode.length !== OTP_LENGTH) {
      setErrorText("Please enter the full 6-digit OTP.");
      return;
    }

    const verificationResult = verifyOtp(otpCode);

    if (verificationResult.ok) {
      navigate("/", { replace: true });
      return;
    }

    if (verificationResult.reason === "expired") {
      setErrorText("OTP expired. Resend a new code and try again.");
      return;
    }

    setErrorText("Incorrect OTP. Please try again.");
  };

  const handleResendOtp = () => {
    const nextPendingOtp = resendOtp();

    if (!nextPendingOtp) {
      navigate("/signup", { replace: true });
      return;
    }

    setOtpDigits(createEmptyOtp());
    setSecondsLeft(Math.max(0, Math.ceil((nextPendingOtp.expiresAt - Date.now()) / 1000)));
    setInfoText(`A new OTP has been generated for ${nextPendingOtp.email}.`);
    setErrorText("");
    inputRefs.current[0]?.focus();
  };

  const minutePart = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secondPart = String(secondsLeft % 60).padStart(2, "0");

  return (
    <AuthShell
      title="Verify your email"
      footer={
        <div className="space-y-2">
          <p className="text-x-text-sec text-[15px] leading-6">Used a wrong email?</p>
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
              {maskEmail(visibleEmail)}
            </span>
            .
          </p>

          <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
              {otpDigits.map((digit, index) => (
                <input
                  key={`otp-digit-${index + 1}`}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={OTP_LENGTH}
                  value={digit}
                  onChange={(event) => handleInputChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  className={`text-x-text h-14 w-full rounded-xl border text-center text-2xl font-bold outline-none transition-all duration-200 ${
                    digit
                      ? "border-x-blue bg-x-surface shadow-[0_0_0_1px_rgba(29,155,240,0.45)]"
                      : "border-x-divider bg-transparent"
                  } focus:border-x-blue focus:bg-x-surface focus:shadow-[0_0_0_2px_rgba(29,155,240,0.35)]`}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            <div className="border-x-divider flex items-center justify-between rounded-xl border px-3 py-2">
              <span className="text-x-text-sec text-sm">Code expires in</span>
              <span
                className={`font-mono text-sm font-semibold ${
                  secondsLeft === 0 ? "text-red-400" : "text-x-text"
                }`}
              >
                {minutePart}:{secondPart}
              </span>
            </div>

            {errorText && <p className="text-sm text-red-400">{errorText}</p>}
            {infoText && <p className="text-sm text-emerald-400">{infoText}</p>}

            <button
              type="submit"
              className="bg-x-bgOpposite text-x-textOpposite flex w-full items-center justify-center rounded-full px-4 py-3 text-[15px] font-bold transition-opacity duration-200 hover:opacity-95"
            >
              Verify and continue
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              className="border-x-divider text-x-text hover:bg-x-surface flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[15px] font-semibold transition-colors duration-200"
            >
              Resend OTP
            </button>
          </form>
        </div>

        <div className="border-x-blue/35 bg-x-blue/10 rounded-xl border px-4 py-3">
          <p className="text-x-text text-sm leading-6">
            Demo OTP:
            <span className="text-x-blue ml-1 font-mono text-base font-bold tracking-[0.24em]">
              {debugOtp}
            </span>
          </p>
        </div>
      </div>
    </AuthShell>
  );
};

export default VerifyOtpPage;
