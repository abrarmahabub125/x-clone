import {
  AlertTriangle,
  KeyRound,
  Mail,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { fetcher } from "../../../../fetcher";
import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import { loginSchema } from "../../../shared/validations/loginSchema";
import { useAuth } from "../../auth/hooks/useAuth";
import FormInput from "../components/FormInput";
import Modal from "../components/Modal";
import SettingsItem from "../components/SettingsItem";

// --- Validations ---
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
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

const deleteAccountSchema = z.object({
  currentPassword: loginSchema.shape.password,
  confirmationText: z.string().refine((val) => val === "DELETE", {
    message: 'Type "DELETE" to confirm',
  }),
});

// --- Reusable Components ---

// --- Main Page ---

const SettingsAndPrivacyPage = () => {
  const navigate = useNavigate();
  const { user, refetchUser } = useAuth();

  const [activeModal, setActiveModal] = useState(null); // 'email', 'password', 'delete'
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    confirmationText: "",
  });

  const closeModals = () => {
    setActiveModal(null);
    setErrors({});
    setIsLoading(false);
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      confirmationText: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const result = emailUpdateSchema.safeParse({
      newEmail: formData.newEmail,
      currentPassword: formData.currentPassword,
    });
    if (!result.success) return setErrors(result.error.flatten().fieldErrors);

    try {
      setIsLoading(true);
      const res = await fetcher("/api/auth/email", {
        method: "PATCH",
        body: JSON.stringify(result.data),
      });
      await refetchUser();
      toast.success(res.message || "Email updated");
      closeModals();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const result = passwordUpdateSchema.safeParse(formData);
    if (!result.success) return setErrors(result.error.flatten().fieldErrors);

    try {
      setIsLoading(true);
      await fetcher("/api/auth/password", {
        method: "PATCH",
        body: JSON.stringify(result.data),
      });
      toast.success("Password updated. Please login again.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const result = deleteAccountSchema.safeParse(formData);
    if (!result.success) return setErrors(result.error.flatten().fieldErrors);

    try {
      setIsLoading(true);
      await fetcher("/api/auth/account", {
        method: "DELETE",
        body: JSON.stringify(result.data),
      });
      toast.success("Account deleted");
      navigate("/register");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <PageHeader className="px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BackButton />
            <span className="text-x-text text-lg font-semibold sm:text-xl">
              Settings & Privacy
            </span>
          </div>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-2xl space-y-8 p-4 py-8">
        {/* Account Section */}
        <div className="space-y-4">
          <h2 className="text-x-text-sec flex items-center gap-2 px-2 text-sm font-semibold tracking-wider lg:text-base">
            <User className="size-4" /> Account Management
          </h2>
          <div className="border-x-divider overflow-hidden rounded-lg border bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <SettingsItem
              icon={Mail}
              title="Email Address"
              description={user?.email || "Update your email"}
              onClick={() => {
                setFormData((f) => ({ ...f, newEmail: user?.email }));
                setActiveModal("email");
              }}
            />
            <hr className="border-x-divider mx-4 dark:border-zinc-800" />
            <SettingsItem
              icon={KeyRound}
              title="Password"
              description="Last changed 3 months ago"
              onClick={() => setActiveModal("password")}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4">
          <h2 className="text-x-red flex items-center gap-2 px-2 text-sm font-semibold tracking-wider lg:text-base">
            <AlertTriangle className="size-4" /> Delete Account
          </h2>
          <div className="bg-x-red/10 overflow-hidden rounded-lg shadow-sm">
            <SettingsItem
              danger
              icon={Trash2}
              title="Delete Account"
              description="Permanently remove all your data"
              onClick={() => setActiveModal("delete")}
            />
          </div>
        </div>

        {/* Security Info */}
        <div className="flex items-start gap-4 rounded-lg bg-blue-50/50 p-6 text-blue-800 dark:bg-blue-500/10 dark:text-blue-200">
          <ShieldCheck className="size-6 shrink-0 text-blue-500" />
          <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
            Sensitive actions like changing email or password require your
            current password for security verification. Active sessions will be
            managed accordingly.
          </p>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Email Modal */}
      <Modal
        isOpen={activeModal === "email"}
        onClose={closeModals}
        title="Update Email"
      >
        <form onSubmit={handleUpdateEmail} className="space-y-5">
          <FormInput
            label="New Email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleInputChange}
            error={errors.newEmail?.[0]}
          />
          <FormInput
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            error={errors.currentPassword?.[0]}
          />
          <button
            disabled={isLoading}
            className="bg-x-bgOpposite text-x-textOpposite w-full cursor-pointer rounded-xl py-2 transition-all disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </Modal>

      {/* Password Modal */}
      <Modal
        isOpen={activeModal === "password"}
        onClose={closeModals}
        title="Change Password"
      >
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <FormInput
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            error={errors.currentPassword?.[0]}
          />
          <FormInput
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            error={errors.newPassword?.[0]}
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleInputChange}
            error={errors.confirmNewPassword?.[0]}
          />
          <button
            disabled={isLoading}
            className="bg-x-bgOpposite text-x-textOpposite w-full cursor-pointer rounded-xl py-2 transition-all disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={activeModal === "delete"}
        onClose={closeModals}
        title="Delete Account"
      >
        <div className="text-x-red mb-6 rounded-2xl bg-red-500/10 p-4 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="size-4" /> Warning: This is permanent!
          </p>
          <p className="mt-1">
            All your data, including posts and settings, will be erased forever.
          </p>
        </div>
        <form onSubmit={handleDeleteAccount} className="space-y-5">
          <FormInput
            label="Current Password"
            type="password"
            name="currentPassword"
            onChange={handleInputChange}
            error={errors.currentPassword?.[0]}
          />
          <FormInput
            label='Type "DELETE" to confirm'
            name="confirmationText"
            placeholder="DELETE"
            onChange={handleInputChange}
            error={errors.confirmationText?.[0]}
          />
          <button
            disabled={isLoading}
            className="text-x-text bg-x-red/90 hover:bg-x-red w-full rounded-xl py-2 font-medium transition-all disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete Permanently"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SettingsAndPrivacyPage;
