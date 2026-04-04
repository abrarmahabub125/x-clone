const Logout = () => {
  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) window.location.href = "/login";
    return null;
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="bg-x-bg flex min-h-screen items-center justify-center px-4">
      <div className="border-x-divider bg-x-surface w-full max-w-md rounded-2xl border p-6">
        {/* Message */}
        <h2 className="text-x-text mb-2 text-center text-xl font-semibold">
          Are you sure you want to logout?
        </h2>
        <p className="text-x-text-sec mb-6 text-center text-sm">
          You will need to login again to access your account.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="bg-x-red hover:bg-x-red/80 flex-1 rounded-xl py-2 font-medium text-white transition duration-200"
          >
            Logout
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
