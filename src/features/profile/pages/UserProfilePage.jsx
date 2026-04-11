import { CalendarDays, MapPin, MoreHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useLoaderData, useParams } from "react-router";
import { fetcher } from "../../../../fetcher";
import { useAuth } from "../../auth/hooks/useAuth";
import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import TabItem from "../../../shared/ui/TabItem";
import EditProfileModal from "../components/EditProfileModal";
import FollowButton from "../../../shared/ui/FollowButton";
import { formatNumber } from "../../../shared/utils/formatNumber";

const FALLBACK_PROFILE_PIC =
  "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg";
const PROFILE_COVER_FALLBACK_CLASS =
  "bg-[radial-gradient(circle_at_top_left,#38bdf8_0%,transparent_35%),linear-gradient(135deg,#082f49_0%,#0f766e_48%,#111827_100%)]";

const profileTabs = [
  { label: "Posts", path: "" },
  { label: "Replies", path: "replies" },
  { label: "Media", path: "media" },
  { label: "Likes", path: "likes" },
];

function getProfileFromLoader(loaderData) {
  return loaderData?.data ?? loaderData ?? {};
}

const UserProfilePage = () => {
  const { userId } = useParams();
  const profileBasePath = `/profile/${userId}`;
  const { user, refetchUser } = useAuth();
  const loaderData = useLoaderData();
  const profileData = useMemo(
    () => getProfileFromLoader(loaderData),
    [loaderData],
  );
  const [profile, setProfile] = useState(() => profileData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const isOwnProfile = user?.id === userId;
  const profileName = profile?.fullName || "Profile";

  useEffect(() => {
    setProfile(profileData);
  }, [profileData]);

  const joinedDate = profile?.joinedAt ? new Date(profile.joinedAt) : null;
  const joinedAtLabel =
    joinedDate && !Number.isNaN(joinedDate.getTime())
      ? joinedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Recently joined";

  const handleSaveProfile = async (formData) => {
    setIsSavingProfile(true);

    try {
      const response = await fetcher("/api/users/update-profile", {
        method: "PATCH",
        body: JSON.stringify(formData),
      });

      setProfile((currentProfile) => ({
        ...currentProfile,
        ...response.data,
      }));

      await refetchUser();
      setIsEditModalOpen(false);
      toast.success(response?.message || "Profile updated successfully.");
    } catch (error) {
      toast.error(error.message || "Could not update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader className="px-3 py-2">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-x-text text-lg font-semibold sm:text-xl">
              {profileName}
            </h1>
            <p className="text-x-text-sec text-xs sm:text-sm">
              {profile.totalPost ?? 0} posts
            </p>
          </div>
        </div>
      </PageHeader>

      <section>
        <div className="h-44 w-full overflow-hidden">
          {profile.coverPhoto ? (
            <img
              className="h-full w-full object-cover object-center"
              src={profile.coverPhoto}
              alt={`${profileName} cover`}
            />
          ) : (
            <div className={`h-full w-full ${PROFILE_COVER_FALLBACK_CLASS}`} />
          )}
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-end justify-between gap-4">
            <div className="border-x-bg bg-x-bg -mt-20 size-32 overflow-hidden rounded-full border-4">
              <img
                className="h-full w-full object-cover object-center"
                src={
                  profile.profilePic ? profile.profilePic : FALLBACK_PROFILE_PIC
                }
                alt={`${profileName} profile`}
              />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                className="hover:bg-x-surface border-x-divider inline-flex size-9 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200"
              >
                <MoreHorizontal className="size-5" />
              </button>
              {isOwnProfile ? (
                <button
                  type="button"
                  className="border-x-divider hover:bg-x-surface rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit profile
                </button>
              ) : (
                <FollowButton userId={userId} />
              )}
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-1.5">
              <h2 className="text-x-text text-xl font-extrabold sm:text-2xl">
                {profileName}
              </h2>
            </div>
            {profile.username && (
              <p className="text-x-text-sec text-[15px]">@{profile.username}</p>
            )}
          </div>

          <div className="mt-3 max-w-2xl space-y-3">
            {profile.bio && (
              <p className="text-x-text text-[15px] leading-6">{profile.bio}</p>
            )}

            <div className="text-x-text-sec flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  <span>{profile.location}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                <span>{`Joined ${joinedAtLabel}`}</span>
              </div>
            </div>

            <div className="flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">
                  {formatNumber(profile.following?.length) ?? 0}
                </span>
                <span className="text-x-text-sec">Following</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">
                  {formatNumber(profile.followers?.length) ?? 0}
                </span>
                <span className="text-x-text-sec">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-x-divider border-t">
        <div className="border-x-divider grid w-full grid-cols-4 border-b">
          {profileTabs.map((tab) => (
            <TabItem
              key={tab.label}
              label={tab.label}
              path={
                tab.path ? `${profileBasePath}/${tab.path}` : profileBasePath
              }
              end={!tab.path}
            />
          ))}
        </div>

        <div>
          <Outlet />
        </div>
      </section>

      {isEditModalOpen && (
        <EditProfileModal
          initialValues={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
          isSaving={isSavingProfile}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
