import { AlertTriangle, Trash2, User } from "lucide-react";
import PageHeader from "../../../shared/ui/PageHeader";
import BackButton from "../../../shared/ui/BackButton";
import SettingIcon from "../../../shared/ui/SettingIcon";

const SettingsAndPrivacyPage = () => {
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

                <div className="mt-5 space-y-4">
                  <button
                    type="button"
                    className="bg-x-red/15 text-x-red mt-3 rounded-3xl px-4 py-2 text-sm font-semibold transition"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAndPrivacyPage;
