import { useState } from "react";
import { useNavigate } from "react-router";
import { fetcher } from "../../../../fetcher";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await fetcher("/api/auth/logout", {
        method: "POST",
      });

      await refetchUser();
      navigate("/login", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Logout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="bg-x-bg flex min-h-screen items-center justify-center px-4">
      <div className="border-x-divider bg-x-surface w-full max-w-md rounded-2xl border p-6">
        <h2 className="text-x-text mb-2 text-center text-xl font-semibold">
          Are you sure you want to logout?
        </h2>
        <p className="text-x-text-sec mb-6 text-center text-sm">
          You will need to login again to access your account.
        </p>

        {errorMessage && (
          <p className="mb-4 text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            disabled={isSubmitting}
            className="bg-x-red hover:bg-x-red/80 flex-1 rounded-xl py-2 font-medium text-white transition duration-200 disabled:opacity-60"
          >
            {isSubmitting ? "Logging out..." : "Logout"}
          </button>

          <button
            onClick={handleCancel}
            className="border-x-divider text-x-text hover:bg-x-surface flex-1 rounded-xl border bg-transparent py-2 font-medium transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
