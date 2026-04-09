import { ImagePlus, MapPin, Quote, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileField from "./ProfileField";

const FALLBACK_PROFILE_PIC =
  "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg";
const PROFILE_COVER_FALLBACK_CLASS =
  "bg-[linear-gradient(197deg,rgba(63,135,251,0.99)_0%,rgba(70,200,252,1)_100%)]";

function buildFormState(initialValues = {}) {
  return {
    profilePic: initialValues.profilePic ?? "",
    fullName: initialValues.fullName ?? "",
    bio: initialValues.bio ?? "",
    location: initialValues.location ?? "",
    coverPhoto: initialValues.coverPhoto ?? "",
  };
}

const PROFILE_FIELDS = [
  {
    label: "Profile Pic URL",
    icon: ImagePlus,
    name: "profilePic",
    placeholder: "https://example.com/profile-photo.jpg",
  },
  {
    label: "Cover Photo URL",
    icon: ImagePlus,
    name: "coverPhoto",
    placeholder: "https://example.com/cover-photo.jpg",
  },
  {
    label: "Full Name",
    icon: UserRound,
    name: "fullName",
    placeholder: "Enter your full name",
    className: "",
  },
  {
    label: "Address",
    icon: MapPin,
    name: "location",
    placeholder: "City, country or full address",
    className: "",
  },
  {
    label: "Bio",
    icon: Quote,
    name: "bio",
    placeholder: "Tell people a little about yourself",
    textarea: true,
    className: "sm:col-span-2",
  },
];

function getTrimmedFormData(formData) {
  return {
    ...formData,
    profilePic: formData.profilePic.trim(),
    fullName: formData.fullName.trim(),
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
  const previewBio =
    trimmedFormData.bio ||
    "Write a short bio to tell people a little about yourself.";
  const previewAddress = trimmedFormData.location || "Add your address";

  const handleChange = (event) => {
    const { name, value } = event.target;

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
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/65 px-4 py-4 backdrop-blur-sm sm:px-6">
      <div
        className="absolute inset-0"
        onClick={() => !isSaving && onClose()}
        aria-hidden="true"
      />

      <form
        className="bg-x-bg relative z-121 flex h-[min(42rem,calc(100vh-1.5rem))] w-full max-w-2xl flex-col overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
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
              <h2 className="text-x-text text-lg font-bold">Edit profile</h2>
            </div>
          </div>

          <button
            type="submit"
            className="bg-x-text text-x-bg rounded-full px-5 py-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSaving || !trimmedFormData.fullName}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
          <div className="border-x-divider overflow-hidden rounded-[1.75rem] border">
            <div className="relative h-44 overflow-hidden">
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
              <div className="border-x-bg bg-x-bg relative z-10 -mt-12 size-28 overflow-hidden rounded-full border-3 shadow-xl">
                <img
                  className="h-full w-full object-cover object-center"
                  src={avatarUrl}
                  alt="Profile avatar preview"
                />
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-x-text text-2xl font-black">
                  {previewName}
                </h3>

                <p className="text-x-text text-sm leading-6">{previewBio}</p>

                <div className="text-x-text-sec inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm">
                  <MapPin className="size-4" />
                  <span>{previewAddress}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
