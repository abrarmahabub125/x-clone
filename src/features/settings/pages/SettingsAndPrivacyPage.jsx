import {
  AlertTriangle,
  KeyRound,
  Mail,
  ShieldCheck,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import toast from "react-hot-toast";
import { fetcher } from "../../../../fetcher";
import { useAuth } from "../../auth/hooks/useAuth";
import { loginSchema } from "../../../shared/validations/loginSchema";
import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import SettingIcon from "../../../shared/ui/SettingIcon";

const emailUpdateSchema = z.object({
  newEmail: loginSchema.shape.email,
  currentPassword: loginSchema.shape.password,
});

const passwordUpdateSchema = z
  .object({
    currentPassword: loginSchema.shape.password,
    newPassword: loginSchema.shape.password,
    confirmNewPassword: loginSchema.shape.password,
  })
  .refine((value) => value.newPassword === value.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New password confirmation does not match.",
  });

const deleteAccountSchema = z.object({
  currentPassword: loginSchema.shape.password,
  confirmationText: z
    .string()
    .trim()
    .refine((value) => value === "DELETE", {
      message: 'Please type "DELETE" to confirm account deletion.',
    }),
});

const initialEmailErrors = {
  newEmail: "",
  currentPassword: "",
};

const initialPasswordErrors = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const initialDeleteErrors = {
  currentPassword: "",
  confirmationText: "",
};

function mapFieldErrors(error, fallbackState) {
  if (!(error instanceof z.ZodError)) {
    return fallbackState;
  }

  const nextState = { ...fallbackState };
  const fieldErrors = error.flatten().fieldErrors;

  for (const key of Object.keys(nextState)) {
    nextState[key] = fieldErrors[key]?.[0] || "";
  }

  return nextState;
}

function SettingsField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <label className="block">
      <span className="text-x-text mb-2 block text-sm font-semibold">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-x-divider bg-x-bg text-x-text w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : ""}`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </label>
  );
}

const SettingsAndPrivacyPage = () => {
  const navigate = useNavigate();
  const { user, refetchUser } = useAuth();

  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    currentPassword: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [deleteForm, setDeleteForm] = useState({
    currentPassword: "",
    confirmationText: "",
  });

  const [emailErrors, setEmailErrors] = useState(initialEmailErrors);
  const [passwordErrors, setPasswordErrors] = useState(initialPasswordErrors);
  const [deleteErrors, setDeleteErrors] = useState(initialDeleteErrors);

  useEffect(() => {
    setEmailForm((currentForm) => ({
      ...currentForm,
      newEmail: user?.email ?? "",
    }));
  }, [user?.email]);

  useEffect(() => {
    if (!isDeleteModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === "Escape" && !isDeletingAccount) {
        setIsDeleteModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDeleteModalOpen, isDeletingAccount]);

  const handleEmailInputChange = (event) => {
    const { name, value } = event.target;

    setEmailForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setEmailErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setPasswordErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const handleDeleteInputChange = (event) => {
    const { name, value } = event.target;

    setDeleteForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setDeleteErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const submitEmailUpdate = async (event) => {
    event.preventDefault();

    const parsedResult = emailUpdateSchema.safeParse(emailForm);

    if (!parsedResult.success) {
      setEmailErrors(mapFieldErrors(parsedResult.error, initialEmailErrors));
      return;
    }

    try {
      setIsUpdatingEmail(true);
      setEmailErrors(initialEmailErrors);

      const response = await fetcher("/api/auth/email", {
        method: "PATCH",
        body: JSON.stringify(parsedResult.data),
      });

      await refetchUser();
      setEmailForm({
        newEmail: response?.data?.email ?? parsedResult.data.newEmail,
        currentPassword: "",
      });
      setIsEmailOpen(false);
      toast.success(response?.message || "Email updated successfully.");
    } catch (error) {
      toast.error(error.message || "Could not update email.");
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const submitPasswordUpdate = async (event) => {
    event.preventDefault();

    const parsedResult = passwordUpdateSchema.safeParse(passwordForm);

    if (!parsedResult.success) {
      setPasswordErrors(
        mapFieldErrors(parsedResult.error, initialPasswordErrors),
      );
      return;
    }

    try {
      setIsUpdatingPassword(true);
      setPasswordErrors(initialPasswordErrors);

      const response = await fetcher("/api/auth/password", {
        method: "PATCH",
        body: JSON.stringify(parsedResult.data),
      });

      await refetchUser();
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast.success(response?.message || "Password updated successfully.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message || "Could not update password.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const submitDeleteAccount = async (event) => {
    event.preventDefault();

    const parsedResult = deleteAccountSchema.safeParse(deleteForm);

    if (!parsedResult.success) {
      setDeleteErrors(mapFieldErrors(parsedResult.error, initialDeleteErrors));
      return;
    }

    try {
      setIsDeletingAccount(true);
      setDeleteErrors(initialDeleteErrors);

      const response = await fetcher("/api/auth/account", {
        method: "DELETE",
        body: JSON.stringify(parsedResult.data),
      });

      await refetchUser();
      toast.success(response?.message || "Account deleted successfully.");
      navigate("/register", { replace: true });
    } catch (error) {
      toast.error(error.message || "Could not delete account.");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-x-2">
            <BackButton />
            <span className="text-x-text text-lg font-semibold sm:text-xl">
              Settings and privacy
            </span>
          </div>
          <div>
            <SettingIcon path="/settings" />
          </div>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          <section className="border-x-divider bg-x-bg rounded-3xl border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-x-blue/10 text-x-blue grid h-12 w-12 place-items-center rounded-xl">
                <User className="size-5" />
              </div>
              <div>
                <h2 className="text-x-text text-lg font-semibold">Account</h2>
                <p className="text-x-text-sec text-sm">
                  Manage your account credentials with a current-password
                  confirmation for every sensitive change.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="border-x-divider bg-x-bg rounded-2xl border p-4 md:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-x-surface text-x-blue mt-0.5 grid h-11 w-11 place-items-center rounded-xl">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="text-x-text text-sm font-semibold md:text-base">
                        Email address
                      </p>
                      <p className="text-x-text-sec mt-1 text-sm leading-6">
                        Current email:{" "}
                        <span className="text-x-text font-medium">
                          {user?.email || "Unavailable"}
                        </span>
                      </p>
                      <p className="text-x-text-sec mt-1 text-sm leading-6">
                        Update your recovery and sign-in email. We will re-check
                        your current password before saving the change.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEmailOpen((currentValue) => !currentValue)}
                    className="border-x-divider bg-x-surface text-x-text hover:bg-x-divider rounded-full border px-4 py-2 text-sm font-semibold transition"
                  >
                    {isEmailOpen ? "Close" : "Update"}
                  </button>
                </div>

                {isEmailOpen && (
                  <form onSubmit={submitEmailUpdate} className="mt-5 space-y-4">
                    <SettingsField
                      label="New email address"
                      type="email"
                      name="newEmail"
                      value={emailForm.newEmail}
                      onChange={handleEmailInputChange}
                      placeholder="name@example.com"
                      error={emailErrors.newEmail}
                    />

                    <SettingsField
                      label="Current password"
                      type="password"
                      name="currentPassword"
                      value={emailForm.currentPassword}
                      onChange={handleEmailInputChange}
                      placeholder="Enter your current password"
                      error={emailErrors.currentPassword}
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isUpdatingEmail}
                        className="bg-x-bgOpposite text-x-textOpposite rounded-full px-5 py-2 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isUpdatingEmail ? "Updating..." : "Save email"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="border-x-divider bg-x-bg rounded-2xl border p-4 md:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-x-surface text-x-blue mt-0.5 grid h-11 w-11 place-items-center rounded-xl">
                      <KeyRound className="size-5" />
                    </div>
                    <div>
                      <p className="text-x-text text-sm font-semibold md:text-base">
                        Password
                      </p>
                      <p className="text-x-text-sec mt-1 text-sm leading-6">
                        Rotate your password regularly to keep your account
                        secure. After a successful password change, you will be
                        signed out and asked to log in again.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setIsPasswordOpen((currentValue) => !currentValue)
                    }
                    className="border-x-divider bg-x-surface text-x-text hover:bg-x-divider rounded-full border px-4 py-2 text-sm font-semibold transition"
                  >
                    {isPasswordOpen ? "Close" : "Change"}
                  </button>
                </div>

                {isPasswordOpen && (
                  <form
                    onSubmit={submitPasswordUpdate}
                    className="mt-5 space-y-4"
                  >
                    <SettingsField
                      label="Current password"
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Enter your current password"
                      error={passwordErrors.currentPassword}
                    />

                    <SettingsField
                      label="New password"
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Enter a new password"
                      error={passwordErrors.newPassword}
                    />

                    <SettingsField
                      label="Confirm new password"
                      type="password"
                      name="confirmNewPassword"
                      value={passwordForm.confirmNewPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Confirm your new password"
                      error={passwordErrors.confirmNewPassword}
                    />

                    <div className="text-x-text-sec bg-x-surface rounded-2xl px-4 py-3 text-sm leading-6">
                      Password must be 8-20 characters and include a lowercase
                      letter, a number, and a special character.
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isUpdatingPassword}
                        className="bg-x-bgOpposite text-x-textOpposite rounded-full px-5 py-2 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isUpdatingPassword
                          ? "Updating..."
                          : "Update password"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>

          <section className="border-x-divider bg-x-bg rounded-3xl border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-x-red/10 text-x-red grid h-12 w-12 place-items-center rounded-xl">
                <Trash2 className="size-5" />
              </div>
              <div>
                <h2 className="text-x-text text-lg font-semibold">
                  Delete account
                </h2>
                <p className="text-x-text-sec text-sm">
                  Permanently remove your account, profile, tweets, follows, and
                  saved data from the platform.
                </p>
              </div>
            </div>

            <div className="text-x-text-sec border-x-divider mt-6 rounded-2xl border p-4 text-sm md:p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-x-red mt-1 size-5" />
                <div>
                  <p className="text-x-text text-sm font-semibold">Important</p>
                  <p className="mt-2 leading-6">
                    This action is irreversible. For safety, we will ask for
                    your current password and a final typed confirmation before
                    deleting the account.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="bg-x-red/15 text-x-red rounded-3xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                >
                  Delete account
                </button>
              </div>
            </div>
          </section>

          <section className="border-x-divider bg-x-bg rounded-3xl border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-x-blue/10 text-x-blue grid h-12 w-12 place-items-center rounded-xl">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="text-x-text text-lg font-semibold">
                  Security note
                </h2>
                <p className="text-x-text-sec text-sm">
                  Sensitive settings use current-password confirmation and secure
                  session cookies. After password changes or account deletion,
                  your active session is invalidated automatically.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/65 px-4 py-4 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => !isDeletingAccount && setIsDeleteModalOpen(false)}
            aria-hidden="true"
          />

          <div className="bg-x-bg border-x-divider relative z-121 w-full max-w-lg overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="border-x-divider flex items-center justify-between gap-3 border-b px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-x-red/10 text-x-red inline-flex size-11 items-center justify-center rounded-full">
                  <Trash2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-x-text text-base font-bold md:text-lg">
                    Delete your account
                  </h3>
                  <p className="text-x-text-sec text-xs md:text-sm">
                    This cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="hover:bg-x-surface inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200"
                onClick={() => !isDeletingAccount && setIsDeleteModalOpen(false)}
                disabled={isDeletingAccount}
                aria-label="Close delete account modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={submitDeleteAccount} className="space-y-5 px-5 py-5">
              <div className="text-x-text-sec bg-x-surface rounded-2xl px-4 py-3 text-sm leading-6">
                Deleting this account removes your profile, tweets, likes,
                bookmarks, reposts, views, and follow relationships.
              </div>

              <SettingsField
                label="Current password"
                type="password"
                name="currentPassword"
                value={deleteForm.currentPassword}
                onChange={handleDeleteInputChange}
                placeholder="Enter your current password"
                error={deleteErrors.currentPassword}
              />

              <SettingsField
                label='Type "DELETE" to confirm'
                name="confirmationText"
                value={deleteForm.confirmationText}
                onChange={handleDeleteInputChange}
                placeholder="DELETE"
                error={deleteErrors.confirmationText}
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="border-x-divider hover:bg-x-surface rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeletingAccount}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-x-red text-white rounded-full px-4 py-2 text-sm font-semibold transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isDeletingAccount}
                >
                  {isDeletingAccount ? "Deleting..." : "Delete account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsAndPrivacyPage;
