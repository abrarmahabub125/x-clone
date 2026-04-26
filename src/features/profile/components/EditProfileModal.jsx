import { ImagePlus, MapPin, Quote, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileField from "./ProfileField";

const FALLBACK_PROFILE_PIC =
  "https://i.ibb.co.com/jZZHbNL5/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-f.jpg";
const PROFILE_COVER_FALLBACK_CLASS =
  "bg-[linear-gradient(197deg,rgba(63,135,251,0.99)_0%,rgba(70,200,252,1)_100%)]";

function buildFormState(initialValues = {}) {
  return {
    profilePic: initialValues.profilePic ?? "",
    fullName: initialValues.fullName ?? "",
    username: initialValues.username ?? "",
    bio: initialValues.bio ?? "",
    location: initialValues.location ?? "",
    coverPhoto: initialValues.coverPhoto ?? "",
  };
}

const PROFILE_FIELDS = [
  {
    label: "Full Name",
    icon: UserRound,
    name: "fullName",
    placeholder: "Enter your full name",
    className: "col-span-1",
  },
  {
    label: "Username",
    icon: UserRound,
    name: "username",
    placeholder: "Enter your username",
    className: "col-span-1",
  },
  {
    label: "Profile Pic URL",
    icon: ImagePlus,
    name: "profilePic",
    placeholder: "https://example.com/profile-photo.jpg",
    className: "col-span-2 md:col-span-1",
  },
  {
    label: "Cover Photo URL",
    icon: ImagePlus,
    name: "coverPhoto",
    placeholder: "https://example.com/cover-photo.jpg",
    className: "col-span-2 md:col-span-1",
  },

  {
    label: "Address",
    icon: MapPin,
    name: "location",
    placeholder: "City, country or full address",
    className: "col-span-2",
  },
  {
    label: "Bio",
    icon: Quote,
    name: "bio",
    placeholder: "Tell people a little about yourself",
    textarea: true,
    className: "col-span-2",
  },
];

function getTrimmedFormData(formData) {
  return {
    ...formData,
    profilePic: formData.profilePic.trim(),
    fullName: formData.fullName.trim(),
    username: formData.username.trim(),
    bio: formData.bio.trim(),
    location: formData.location.trim(),
    coverPhoto: formData.coverPhoto.trim(),
  };
}

const EditProfileModal = ({
  initialValues,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const [formData, setFormData] = useState(() => buildFormState(initialValues));

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSaving) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSaving, onClose]);

  const trimmedFormData = getTrimmedFormData(formData);
  const avatarUrl = trimmedFormData.profilePic || FALLBACK_PROFILE_PIC;
  const previewName = trimmedFormData.fullName || "Your full name";
  const prevUsername = trimmedFormData.username
    ? `@${trimmedFormData.username}`
    : "@username";
  const previewBio =
    trimmedFormData.bio ||
    "Write a short bio to tell people a little about yourself.";
  const previewAddress = trimmedFormData.location || "Add your address";

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (!PROFILE_FIELDS.some((field) => field.name === name)) {
      return;
    }

    if (name === "profilePic" || name === "coverPhoto") {
      try {
        new URL(value);
      } catch (e) {
        // invalid URL, ignore the change
        return;
      }
    }

    if (name === "username") {
      // disallow spaces in username
      if (/\s/.test(value)) {
        return;
      }
    }

    if (name === "fullName") {
      // disallow newlines in full name
      if (/\n/.test(value)) {
        return;
      }
    }
    if (name === "fullName") {
      // disallow more than 50 characters in full name
      if (value.length > 50) {
        return;
      }
    }

    if (name === "location") {
      // disallow newlines in location
      if (/\n/.test(value)) {
        return;
      }
    }
    if (name === "bio") {
      // disallow more than 4 lines in bio
      const lines = value.split("\n");
      if (lines.length > 4) {
        return;
      }
    }

    if (name === "bio") {
      // disallow more than 280 characters in bio
      if (value.length > 280) {
        return;
      }
    }

    if (name === "username") {
      // disallow more than 15 characters in username
      if (value.length > 20) {
        return;
      }
    }

    if (name === "location") {
      // disallow more than 100 characters in location
      if (value.length > 100) {
        return;
      }
    }
    if (name === "coverPhoto") {
      // disallow more than 5MB in cover photo
      if (value.length > 5000) {
        return;
      }
    }

    if (name === "profilePic") {
      // disallow more than 5MB in profile pic
      if (value.length > 5000) {
        return;
      }
    }

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(trimmedFormData);
  };

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/65 px-4 py-4 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => !isSaving && onClose()}
        aria-hidden="true"
      />

      <form
        className="bg-x-bg border-x-divider relative z-121 flex h-[min(42rem,calc(100vh-1.5rem))] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        onSubmit={handleSubmit}
      >
        {/* modal header  */}
        <div className="border-x-divider flex items-center justify-between gap-3 border-b px-5 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hover:bg-x-surface inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200"
              onClick={() => !isSaving && onClose()}
              disabled={isSaving}
              aria-label="Close edit profile modal"
            >
              <X className="size-5" />
            </button>

            <div>
              <h2 className="text-x-text text-base font-bold md:text-lg">
                Edit profile
              </h2>
            </div>
          </div>

          <button
            type="submit"
            className="bg-x-text text-x-bg rounded-full px-5 py-1.5 text-xs font-semibold transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm"
            disabled={isSaving || !trimmedFormData.fullName}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
          <div className="border-x-divider overflow-hidden rounded-[1.75rem] border">
            <div className="relative h-36 overflow-hidden md:h-44">
              {trimmedFormData.coverPhoto ? (
                <img
                  className="h-full w-full object-cover object-center"
                  src={trimmedFormData.coverPhoto}
                  alt="Profile cover preview"
                />
              ) : (
                <div
                  className={`h-full w-full ${PROFILE_COVER_FALLBACK_CLASS}`}
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-black/5" />

              <span className="absolute top-4 right-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                Live preview
              </span>
            </div>

            <div className="bg-x-bg px-5 pb-5">
              <div className="border-x-bg bg-x-bg relative z-10 -mt-14 size-24 overflow-hidden rounded-full border-3 shadow-xl md:-mt-12 lg:size-28">
                <img
                  className="h-full w-full object-cover object-center"
                  src={avatarUrl}
                  alt="Profile avatar preview"
                />
              </div>

              <div className="mt-2 space-y-2 md:mt-4">
                <h3 className="text-x-text text-lg font-semibold md:text-2xl">
                  {previewName}
                </h3>
                <p className="text-x-text-sec text-sm font-light lg:text-base">
                  {prevUsername}
                </p>

                <p className="text-x-text text-sm leading-6">{previewBio}</p>

                <div className="text-x-text-sec inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs md:text-sm">
                  <MapPin className="size-3.5 md:size-4" />
                  <span>{previewAddress}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid w-full grid-cols-2 gap-4">
            {PROFILE_FIELDS.map((field) => (
              <ProfileField
                key={field.name}
                label={field.label}
                icon={field.icon}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                textarea={field.textarea}
                className={field.className}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
