import { useState } from "react";
import { AlertTriangle, Bell, ShieldCheck, Trash2, User } from "lucide-react";
import PageHeader from "../../../shared/ui/PageHeader";
import BackButton from "../../../shared/ui/BackButton";
import SettingIcon from "../../../shared/ui/SettingIcon";

const SettingsAndPrivacyPage = () => {
  const [privateProfile, setPrivateProfile] = useState(false);
  const [mentionNotifications, setMentionNotifications] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmationPhrase, setDeleteConfirmationPhrase] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleDeleteAccount = () => {
    if (deleteConfirmationPhrase.trim().toLowerCase() === "delete") {
      setAccountDeleted(true);
      setShowDeleteConfirm(false);
      setDeleteConfirmationPhrase("");
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
          <div className="space-y-6">
            <section className="border-x-divider bg-x-bg rounded-xl border p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-x-blue/10 text-x-blue grid h-12 w-12 place-items-center rounded-xl">
                  <User className="size-5" />
                </div>
                <div>
                  <h2 className="text-x-text text-lg font-semibold">Account</h2>
                  <p className="text-x-text-sec text-sm">
                    Manage login, contact, and profile preferences.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="border-x-divider bg-x-bg rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-x-text text-sm font-semibold">
                        Display name
                      </p>
                      <p className="text-x-text-sec mt-1 text-sm">
                        Your public name on the app.
                      </p>
                    </div>
                    <button className="border-x-divider bg-x-surface text-x-text hover:bg-x-divider rounded-full border px-4 py-2 text-sm font-semibold transition">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="border-x-divider bg-x-bg rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-x-text text-sm font-semibold">
                        Email address
                      </p>
                      <p className="text-x-text-sec mt-1 text-sm">
                        Keep your email current for account recovery.
                      </p>
                    </div>
                    <button className="border-x-divider bg-x-surface text-x-text hover:bg-x-divider rounded-full border px-4 py-2 text-sm font-semibold transition">
                      Update
                    </button>
                  </div>
                </div>

                <div className="border-x-divider bg-x-bg rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-x-text text-sm font-semibold">
                        Password
                      </p>
                      <p className="text-x-text-sec mt-1 text-sm">
                        Change your password to keep your account secure.
                      </p>
                    </div>
                    <button className="border-x-divider bg-x-surface text-x-text hover:bg-x-divider rounded-full border px-4 py-2 text-sm font-semibold transition">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-x-divider bg-x-bg rounded-xl border p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-x-green/10 text-x-green grid h-12 w-12 place-items-center rounded-xl">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h2 className="text-x-text text-lg font-semibold">Privacy</h2>
                  <p className="text-x-text-sec text-sm">
                    Control who can interact with you and how your profile
                    behaves.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <label className="border-x-divider bg-x-bg flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="text-x-text text-sm font-semibold">
                      Private profile
                    </p>
                    <p className="text-x-text-sec mt-1 text-sm">
                      Only approved followers can see your tweets.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privateProfile}
                    onChange={() => setPrivateProfile((prev) => !prev)}
                    className="border-x-divider text-x-blue accent-x-blue h-5 w-5 rounded"
                  />
                </label>

                <label className="border-x-divider bg-x-bg flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="text-x-text text-sm font-semibold">
                      Mention notifications
                    </p>
                    <p className="text-x-text-sec mt-1 text-sm">
                      Receive notifications when someone mentions you.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={mentionNotifications}
                    onChange={() => setMentionNotifications((prev) => !prev)}
                    className="border-x-divider text-x-blue accent-x-blue h-5 w-5 rounded"
                  />
                </label>

                <label className="border-x-divider bg-x-bg flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="text-x-text text-sm font-semibold">
                      Personalized ads
                    </p>
                    <p className="text-x-text-sec mt-1 text-sm">
                      Allow tailored content across the platform.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={personalizedAds}
                    onChange={() => setPersonalizedAds((prev) => !prev)}
                    className="border-x-divider text-x-blue accent-x-blue h-5 w-5 rounded"
                  />
                </label>
              </div>
            </section>

            <section className="border-x-divider bg-x-bg rounded-3xl border p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-x-blue/10 text-x-blue grid h-12 w-12 place-items-center rounded-xl">
                  <Bell className="size-5" />
                </div>
                <div>
                  <h2 className="text-x-text text-lg font-semibold">
                    Notifications
                  </h2>
                  <p className="text-x-text-sec text-sm">
                    Manage alerts and communications from the app.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <label className="border-x-divider bg-x-bg flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="text-x-text text-sm font-semibold">
                      Email alerts
                    </p>
                    <p className="text-x-text-sec mt-1 text-sm">
                      Receive updates and notifications by email.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={() => setEmailAlerts((prev) => !prev)}
                    className="border-x-divider text-x-blue accent-x-blue h-5 w-5 rounded"
                  />
                </label>

                <div className="border-x-divider bg-x-bg rounded-3xl border p-4">
                  <p className="text-x-text text-sm font-semibold">
                    Push notifications
                  </p>
                  <p className="text-x-text-sec mt-1 text-sm">
                    Push notification settings are managed by your device
                    preferences.
                  </p>
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
                    Remove your account permanently. This action cannot be
                    undone.
                  </p>
                </div>
              </div>

              <div className="text-x-text-sec border-x-divider mt-6 rounded-xl border p-4 text-sm md:p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-x-red mt-1 size-5" />
                  <div>
                    <p className="text-x-text text-sm font-semibold">
                      Important
                    </p>
                    <p className="mt-2 leading-6">
                      Deleting your account removes your profile, tweets, and
                      all data from the platform.
                    </p>
                  </div>
                </div>

                {accountDeleted ? (
                  <div className="border-x-divider text-x-text mt-5 rounded-3xl border bg-white p-4 text-sm">
                    <p className="text-x-text font-semibold">
                      Account deletion complete
                    </p>
                    <p className="text-x-text-sec mt-2">
                      Your account deletion request is recorded here as a
                      completed UI flow.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 space-y-4">
                    {showDeleteConfirm ? (
                      <div className="border-x-divider space-y-4 rounded-xl border p-4">
                        <p className="text-x-text text-sm">
                          Type <span className="font-semibold">DELETE</span> to
                          confirm account removal.
                        </p>
                        <input
                          value={deleteConfirmationPhrase}
                          onChange={(event) =>
                            setDeleteConfirmationPhrase(event.target.value)
                          }
                          placeholder="Type DELETE to confirm"
                          className="border-x-divider bg-x-bg text-x-text focus:border-x-red w-full rounded-xl border px-4 py-3 text-sm transition outline-none"
                        />
                        <button
                          type="button"
                          disabled={
                            deleteConfirmationPhrase.trim().toLowerCase() !==
                            "delete"
                          }
                          onClick={handleDeleteAccount}
                          className="bg-x-red hover:bg-opacity-90 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-90"
                        >
                          Confirm delete account
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-x-red hover:bg-x-red-hover mt-3 rounded-3xl px-5 py-3 text-sm font-semibold text-white transition"
                      >
                        Delete account
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAndPrivacyPage;
