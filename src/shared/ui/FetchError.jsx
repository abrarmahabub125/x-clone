import { CircleAlert } from "lucide-react";

const FetchError = ({ message = "Failed to load data. Please try again." }) => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-transparent p-6 text-center">
        <div className="mb-3 flex justify-center text-4xl text-red-400">
          <CircleAlert />
        </div>

        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Something went wrong
        </h2>

        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          {message}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FetchError;
