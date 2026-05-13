import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const FormInput = ({ label, error, type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label className="text-x-text-sec mb-1 ml-1 text-xs font-semibold tracking-wider capitalize lg:text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`bg-x-bg w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none focus:ring-4 lg:text-base ${
            error
              ? "border-red-500 focus:ring-red-500/10"
              : "border-x-divider focus:ring-blue-500/10"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="ml-1 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
