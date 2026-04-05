import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import XLogo from "../assets/logo/x-logo.svg";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Logo / Brand */}
        <img className="mb-12 h-14" src={XLogo} alt="x-logo" />

        {/* 404 Text */}
        <h2 className="mb-2 text-6xl font-extrabold">404</h2>

        <p className="mb-4 text-lg font-semibold">This page doesn’t exist</p>

        <p className="mb-8 text-sm text-gray-400">
          Try searching for something else, or go back to your home timeline.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200"
          >
            <Home size={18} />
            Go Home
          </Link>

          <Link
            to="/explore"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-600 px-6 py-2 font-semibold transition hover:bg-gray-900"
          >
            <Search size={18} />
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
