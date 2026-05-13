import { Camera, MapPin, Quote, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProfileField from "./ProfileField";

const FALLBACK_PROFILE_PIC =
  "https://i.ibb.co.com/jZZHbNL5/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-f.jpg";
const PROFILE_COVER_FALLBACK_CLASS =
  "bg-[linear-gradient(197deg,rgba(63,135,251,0.99)_0%,rgba(70,200,252,1)_100%)]";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

function buildFormState(initialValues = {}) {
  return {
    profilePic: initialValues.profilePic ?? "",
    profilePicFile: null,
    profilePicPreview: initialValues.profilePic ?? "",
    fullName: initialValues.fullName ?? "",
    username: initialValues.username ?? "",
    bio: initialValues.bio ?? "",
    location: initialValues.location ?? "",
    coverPhoto: initialValues.coverPhoto ?? "",
    coverPhotoFile: null,
    coverPhotoPreview: initialValues.coverPhoto ?? "",
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
    fullName: formData.fullName.trim(),
    username: formData.username.trim(),
    bio: formData.bio.trim(),
    location: formData.location.trim(),
    profilePicFile: formData.profilePicFile,
    coverPhotoFile: formData.coverPhotoFile,
  };
}

const EditProfileModal = ({
  initialValues,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const [formData, setFormData] = useState(() => buildFormState(initialValues));
  const [fileErrors, setFileErrors] = useState({});
  const profilePicInputRef = useRef(null);
  const coverPhotoInputRef = useRef(null);

  const validateImageFile = (file) => {
    if (!file) return null;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Only JPEG, PNG, WebP, and GIF formats are allowed";
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return "Image size must be less than 5MB";
    }

    return null;
  };

  const handleImageFileChange = (event, fieldName) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      setFileErrors((prev) => ({ ...prev, [fieldName]: error }));
      return;
    }

    setFileErrors((prev) => ({ ...prev, [fieldName]: "" }));

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result;
      const previewFieldName = `${fieldName}Preview`;
      setFormData((current) => ({
        ...current,
        [fieldName]: file,
        [previewFieldName]: previewUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

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
  const avatarUrl = formData.profilePicPreview || FALLBACK_PROFILE_PIC;
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

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data for submission
    const submitData = {
      fullName: trimmedFormData.fullName,
      username: trimmedFormData.username,
      bio: trimmedFormData.bio,
      location: trimmedFormData.location,
      profilePic: formData.profilePicPreview || "",
      coverPhoto: formData.coverPhotoPreview || "",
    };

    onSave(submitData);
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
            {/* Cover Photo Section */}
            <div className="relative h-36 overflow-hidden md:h-44">
              {formData.coverPhotoPreview ? (
                <img
                  className="h-full w-full object-cover object-center"
                  src={formData.coverPhotoPreview}
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

              {/* Cover Photo Camera Button */}
              <button
                type="button"
                className="bg-x-surface absolute right-4 bottom-4 rounded-full p-2.5 text-white transition-all duration-150 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => coverPhotoInputRef.current?.click()}
                disabled={isSaving}
                title="Change cover photo"
              >
                <Camera className="size-5" />
              </button>

              <input
                ref={coverPhotoInputRef}
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                onChange={(e) => handleImageFileChange(e, "coverPhoto")}
                className="hidden"
                disabled={isSaving}
              />
            </div>

            {/* Profile Pic and Info */}
            <div className="bg-x-bg px-5 pb-5">
              <div className="border-x-bg bg-x-bg group relative z-10 -mt-14 size-24 rounded-full border-3 md:-mt-12 lg:size-28">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={avatarUrl}
                  alt="Profile avatar preview"
                />

                {/* Profile Pic Camera Button */}
                <button
                  type="button"
                  className="bg-x-surface absolute right-0 bottom-0 rounded-full p-2 text-white transition-all duration-150 hover:scale-105"
                  onClick={() => profilePicInputRef.current?.click()}
                  disabled={isSaving}
                  title="Change profile picture"
                >
                  <Camera className="size-4" />
                </button>

                <input
                  ref={profilePicInputRef}
                  type="file"
                  accept={ALLOWED_IMAGE_TYPES.join(",")}
                  onChange={(e) => handleImageFileChange(e, "profilePic")}
                  className="hidden"
                  disabled={isSaving}
                />
              </div>

              {/* File Error Messages */}
              {fileErrors.profilePicFile && (
                <p className="mt-2 text-xs text-red-500">
                  {fileErrors.profilePicFile}
                </p>
              )}
              {fileErrors.coverPhotoFile && (
                <p className="mt-2 text-xs text-red-500">
                  {fileErrors.coverPhotoFile}
                </p>
              )}

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
