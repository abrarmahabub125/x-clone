import { createElement } from "react";

const ProfileField = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  placeholder,
  textarea = false,
  className = "",
}) => {
  const sharedClasses =
    "border-x-divider bg-x-bg text-x-text placeholder:text-x-text-sec/80 focus:border-x-blue mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition duration-200";

  return (
    <label className={`block ${className}`}>
      <span className="text-x-text flex items-center gap-2 text-sm font-semibold">
        {createElement(Icon, { className: "text-x-text-sec size-4" })}
        {label}
      </span>

      {textarea ? (
        <textarea
          className={`${sharedClasses} min-h-28 resize-none`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={sharedClasses}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};

export default ProfileField;
