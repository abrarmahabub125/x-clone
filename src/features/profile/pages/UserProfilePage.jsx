import { useState } from "react";
import {
  CalendarDays,
  Link2,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import { useParams } from "react-router";
import BackButton from "../../../shared/ui/BackButton";
import PageHeader from "../../../shared/ui/PageHeader";
import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";
import TweetCard from "../../../shared/ui/TweetCard";

const profileTabs = ["Posts", "Replies", "Media", "Likes"];

const profilePosts = [
  {
    id: 1,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "2h",
    content:
      "Building this X clone step by step. Cleaning structure, fixing routes, and making the UI feel much closer to the real thing.",
    avatar: MyPhoto,
    verified: true,
    replies: 18,
    reposts: 9,
    likes: 124,
    views: "8.2K",
  },
  {
    id: 2,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "Yesterday",
    content:
      "Frontend polishing takes time, but consistent spacing, borders, and header behavior change the whole product feel.",
    avatar: MyPhoto,
    verified: true,
    replies: 6,
    reposts: 4,
    likes: 71,
    views: "4.5K",
  },
  {
    id: 3,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "Mar 22",
    content:
      "Trying to recreate the calm, dense layout of X profile pages without losing responsiveness on smaller screens.",
    avatar: MyPhoto,
    verified: true,
    image: MyPhoto,
    replies: 22,
    reposts: 11,
    likes: 203,
    views: "12K",
  },
];

const UserProfilePage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="min-h-screen">
      <PageHeader className="px-3 py-2">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-x-text text-lg font-semibold sm:text-xl">
              Abrar Mahabub
            </h1>
            <p className="text-x-text-sec text-xs sm:text-sm">142 posts</p>
          </div>
        </div>
      </PageHeader>

      <section>
        <div className="h-48 w-full bg-[linear-gradient(135deg,#1d9bf0_0%,#0f172a_55%,#101820_100%)] sm:h-56" />

        <div className="px-4 pb-4">
          <div className="flex items-end justify-between gap-4">
            <div className="-mt-16 size-32 overflow-hidden rounded-full border-4 border-x-bg bg-x-bg sm:-mt-20 sm:size-36">
              <img
                className="h-full w-full object-cover object-center"
                src={MyPhoto}
                alt="Abrar Mahabub profile"
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
                Abrar Mahabub
              </h2>
            </div>
            <p className="text-x-text-sec text-[15px]">@abrar_mahabub_{userId}</p>
          </div>

          <div className="mt-3 max-w-2xl space-y-3">
            <p className="text-x-text text-[15px] leading-6">
              Frontend developer focused on React UI, clean layouts, and building
              polished product experiences. Recreating X with attention to real
              structure and interaction details.
            </p>

            <div className="text-x-text-sec flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Link2 className="size-4" />
                <a href="https://x.com" className="text-x-blue hover:underline">
                  x.com/abrar_mahabub
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                <span>Joined January 2024</span>
              </div>
            </div>

            <div className="flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">420</span>
                <span className="text-x-text-sec">Following</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-x-text font-semibold">12.7K</span>
                <span className="text-x-text-sec">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-x-divider border-t">
        <div className="grid w-full grid-cols-4 border-b border-x-divider">
          {profileTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="hover:bg-x-divider/35 flex w-full cursor-pointer items-center justify-center px-3 pt-3.5 transition-all duration-200 ease-in-out"
              >
                <div className="flex w-fit flex-col items-center">
                  <span
                    className={`text-sm whitespace-nowrap md:text-base ${
                      isActive ? "text-x-text font-semibold" : "text-x-text-sec"
                    }`}
                  >
                    {tab}
                  </span>
                  <div className="mt-2 h-1 w-full min-w-12 overflow-hidden rounded-full sm:min-w-16">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isActive ? "bg-x-blue" : "bg-transparent"
                      }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div>
          {profilePosts.map((post) => (
            <TweetCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
