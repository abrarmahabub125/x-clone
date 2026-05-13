import { useState } from "react";
import { useNavigate } from "react-router";
import { fetcher } from "../../../../fetcher";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useAuth();
  const FALLBACK_PROFILE_PIC =
    "https://i.ibb.co.com/jZZHbNL5/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-f.jpg";

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
      <div className="border-x-divider bg-x-bg w-full max-w-md rounded-2xl border p-6">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="bg-x-surface mb-1 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
            <img
              src={user?.profilePic || FALLBACK_PROFILE_PIC}
              alt="Profile"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h1 className="text-x-text text-lg font-bold">
            {user?.fullName || "User"}
          </h1>
        </div>

        <h2 className="text-x-text mb-2 text-left text-xl font-semibold">
          Are you sure you want to logout ?
        </h2>
        <p className="text-x-text-sec mb-6 text-left text-sm">
          You will need to login again to access your account.
        </p>

        {errorMessage && (
          <p className="mb-4 text-left text-sm text-red-500">{errorMessage}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            disabled={isSubmitting}
            className="bg-x-red/10 text-x-red flex-1 cursor-pointer rounded-md py-2 font-medium transition duration-200 disabled:opacity-60"
          >
            {isSubmitting ? "Logging out..." : "Logout"}
          </button>

          <button
            onClick={handleCancel}
            className="text-x-text hover:bg-x-surface border-x-divider flex-1 rounded-md border bg-transparent py-2 font-medium transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
