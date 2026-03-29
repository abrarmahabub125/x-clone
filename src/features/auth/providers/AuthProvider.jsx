import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const USER_STORAGE_KEY = "x-user";
const OTP_STORAGE_KEY = "x-pending-otp";
const OTP_EXPIRY_TIME = 5 * 60 * 1000;

const readStoredUser = () => {
  try {
    return localStorage.getItem(USER_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const persistUser = (value) => {
  try {
    if (value) {
      localStorage.setItem(USER_STORAGE_KEY, "1");
      return;
    }

    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Ignore storage failures and keep auth state in memory.
  }
};

const readPendingOtp = () => {
  try {
    const rawOtpState = sessionStorage.getItem(OTP_STORAGE_KEY);

    if (!rawOtpState) {
      return null;
    }

    const parsedOtpState = JSON.parse(rawOtpState);

    if (
      !parsedOtpState ||
      typeof parsedOtpState !== "object" ||
      typeof parsedOtpState.otp !== "string" ||
      typeof parsedOtpState.email !== "string" ||
      typeof parsedOtpState.expiresAt !== "number"
    ) {
      return null;
    }

    if (Date.now() > parsedOtpState.expiresAt) {
      sessionStorage.removeItem(OTP_STORAGE_KEY);
      return null;
    }

    return parsedOtpState;
  } catch {
    return null;
  }
};

const persistPendingOtp = (value) => {
  try {
    if (!value) {
      sessionStorage.removeItem(OTP_STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage failures and keep pending OTP in memory.
  }
};

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [pendingOtp, setPendingOtp] = useState(readPendingOtp);

  const updateUser = (value) => {
    setUser(value);
    persistUser(value);
  };

  const clearPendingOtp = () => {
    setPendingOtp(null);
    persistPendingOtp(null);
  };

  const startOtpVerification = ({ name, email }) => {
    const nextPendingOtp = {
      name: name.trim(),
      email: email.trim(),
      otp: generateOtp(),
      expiresAt: Date.now() + OTP_EXPIRY_TIME,
    };

    setPendingOtp(nextPendingOtp);
    persistPendingOtp(nextPendingOtp);

    return nextPendingOtp;
  };

  const resendOtp = () => {
    if (!pendingOtp) {
      return null;
    }

    const nextPendingOtp = {
      ...pendingOtp,
      otp: generateOtp(),
      expiresAt: Date.now() + OTP_EXPIRY_TIME,
    };

    setPendingOtp(nextPendingOtp);
    persistPendingOtp(nextPendingOtp);

    return nextPendingOtp;
  };

  const verifyOtp = (code) => {
    if (!pendingOtp) {
      return { ok: false, reason: "missing" };
    }

    if (Date.now() > pendingOtp.expiresAt) {
      clearPendingOtp();
      return { ok: false, reason: "expired" };
    }

    if (code !== pendingOtp.otp) {
      return { ok: false, reason: "invalid" };
    }

    clearPendingOtp();
    updateUser(true);
    return { ok: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        pendingOtp,
        startOtpVerification,
        verifyOtp,
        resendOtp,
        clearPendingOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };


