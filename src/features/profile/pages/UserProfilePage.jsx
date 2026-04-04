import { Suspense } from "react";
import { CalendarDays, MapPin, MoreHorizontal } from "lucide-react";
import { Outlet, useLoaderData, useParams } from "react-router";
import Spinner from "../../../shared/loaders/Spinner";
import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import TabItem from "../../../shared/ui/TabItem";

const profileTabs = [
  { label: "Posts", path: "" },
  { label: "Replies", path: "replies" },
  { label: "Media", path: "media" },
  { label: "Likes", path: "likes" },
];

const UserProfilePage = () => {
  const { userId } = useParams();
  const profileBasePath = `/profile/${userId}`;

  const profileData = useLoaderData();

  return (
    <div className="min-h-screen">
      <PageHeader className="px-3 py-2">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-x-text text-lg font-semibold sm:text-xl">
              {profileData.fullName}
            </h1>
            <p className="text-x-text-sec text-xs sm:text-sm">
              {profileData.totalPost} posts
            </p>
          </div>
        </div>
      </PageHeader>

      <section>
        <div className="h-48 w-full bg-[linear-gradient(197deg,rgba(63,135,251,0.99)_0%,rgba(70,200,252,1)_100%)] sm:h-56" />

        <div className="px-4 pb-4">
          <div className="flex items-end justify-between gap-4">
            <div className="border-x-bg bg-x-bg -mt-16 size-32 overflow-hidden rounded-full border-4 sm:-mt-20 sm:size-36">
              <img
                className="h-full w-full object-cover object-center"
                src={
                  profileData.profilePic
                    ? profileData.profilePic
                    : "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg"
                }
                alt={`${profileData.fullName} profile`}
              />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button className="hover:bg-x-surface border-x-divider inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-200">
                <MoreHorizontal className="size-5" />
              </button>
              <button className="border-x-divider hover:bg-x-surface rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200">
                Edit profile
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-1.5">
              <h2 className="text-x-text text-xl font-extrabold sm:text-2xl">
                {profileData.fullName}
              </h2>
            </div>
            {profileData.username && (
              <p className="text-x-text-sec text-[15px]">
                {profileData.username}
              </p>
            )}
          </div>

          <div className="mt-3 max-w-2xl space-y-3">
            {profileData.bio && (
              <p className="text-x-text text-[15px] leading-6">
                {profileData.bio}
              </p>
            )}

            <div className="text-x-text-sec flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {profileData.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  <span>{profileData.location}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                <span>
                  {new Date(profileData.joinedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">
                  {profileData.following.length}
                </span>
                <span className="text-x-text-sec">Following</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">
                  {profileData.followers.length}
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
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
