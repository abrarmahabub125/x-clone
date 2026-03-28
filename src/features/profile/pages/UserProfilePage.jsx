import { Suspense } from "react";
import {
  CalendarDays,
  Link2,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import { Outlet, useParams } from "react-router";
import Spinner from "../../../shared/loaders/Spinner";
import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import TabItem from "../../../shared/ui/TabItem";
import { profileInfo } from "../data/profileData";

const profileTabs = [
  { label: "Posts", path: "" },
  { label: "Replies", path: "replies" },
  { label: "Media", path: "media" },
  { label: "Likes", path: "likes" },
];

const UserProfilePage = () => {
  const { userId } = useParams();
  const profileBasePath = `/profile/${userId}`;

  return (
    <div className="min-h-screen">
      <PageHeader className="px-3 py-2">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-x-text text-lg font-semibold sm:text-xl">
              {profileInfo.name}
            </h1>
            <p className="text-x-text-sec text-xs sm:text-sm">
              {profileInfo.totalPosts} posts
            </p>
          </div>
        </div>
      </PageHeader>

      <section>
        <div className={`h-48 w-full sm:h-56 ${profileInfo.bannerClass}`} />

        <div className="px-4 pb-4">
          <div className="flex items-end justify-between gap-4">
            <div className="-mt-16 size-32 overflow-hidden rounded-full border-4 border-x-bg bg-x-bg sm:-mt-20 sm:size-36">
              <img
                className="h-full w-full object-cover object-center"
                src={profileInfo.avatar}
                alt={`${profileInfo.name} profile`}
              />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button className="hover:bg-x-surface inline-flex size-9 items-center justify-center rounded-full border border-x-divider transition-colors duration-200">
                <MoreHorizontal className="size-5" />
              </button>
              <button className="rounded-full border border-x-divider px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-x-surface">
                Edit profile
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-1.5">
              <h2 className="text-x-text text-xl font-extrabold sm:text-2xl">
                {profileInfo.name}
              </h2>
            </div>
            <p className="text-x-text-sec text-[15px]">
              @{profileInfo.handle}_{userId}
            </p>
          </div>

          <div className="mt-3 max-w-2xl space-y-3">
            <p className="text-x-text text-[15px] leading-6">{profileInfo.bio}</p>

            <div className="text-x-text-sec flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                <span>{profileInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Link2 className="size-4" />
                <a
                  href={profileInfo.website}
                  className="text-x-blue hover:underline"
                >
                  {profileInfo.websiteLabel}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                <span>{profileInfo.joined}</span>
              </div>
            </div>

            <div className="flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">
                  {profileInfo.following}
                </span>
                <span className="text-x-text-sec">Following</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">
                  {profileInfo.followers}
                </span>
                <span className="text-x-text-sec">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-x-divider border-t">
        <div className="grid w-full grid-cols-4 border-b border-x-divider">
          {profileTabs.map((tab) => (
            <TabItem
              key={tab.label}
              label={tab.label}
              path={tab.path ? `${profileBasePath}/${tab.path}` : profileBasePath}
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
