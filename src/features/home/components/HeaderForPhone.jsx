import { Link } from "react-router";
import { Plus } from "lucide-react";
import { BookmarkIcon, User2Icon, Settings, LogOutIcon } from "lucide-react";
import { useState } from "react";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import MobileLink from "../../../shared/navigation/components/MobileLink";
import { useAuth } from "../../auth/hooks/useAuth";

const HeaderForPhone = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useAuth();

  const { id, fullName, username, profilePic } = user;

  return (
    <div className="px-4 pt-2 md:hidden">
      <div className="grid w-full grid-cols-3 grid-rows-1 gap-x-4">
        <div className="flex items-center justify-start">
          <button
            onClick={() => setIsNavOpen(true)}
            className="size-9 cursor-pointer overflow-hidden rounded-full"
          >
            <img
              className="h-full w-full object-cover object-center"
              src={
                profilePic ||
                "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg"
              }
              alt="profile-image"
            />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Link to="/">
            <img className="size-5" src={XLogo} alt="x-logo" />
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <button className="border-x-divider inline-block w-fit rounded-full border px-4 py-2 text-xs">
            Subscribe
          </button>
        </div>
      </div>

      <div
        onClick={() => setIsNavOpen(false)}
        className={`bg-x-bg/40 fixed top-0 left-0 h-screen w-full -translate-x-full transition-all duration-200 ${isNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-x-bg border-x-divider h-full w-fit border-r p-3">
          <div>
            <div className="flex items-center justify-between px-1.5">
              <div className="border-x-divider size-10 overflow-hidden rounded-full border">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={
                    profilePic ||
                    "https://i.ibb.co.com/MYd59yV/man-professional-business-casual-young-avatar-icon-illustration-1277826-627.jpg"
                  }
                  alt="profile-image"
                />
              </div>
              <div>
                <button className="border-x-text-sec flex size-7 cursor-pointer items-center justify-center rounded-full border">
                  <Plus className="size-5" />
                </button>
              </div>
            </div>
            <div className="mt-1 flex flex-col justify-start px-1.5">
              <span className="text-x-text text-sm font-semibold sm:text-base">
                {fullName}
              </span>
              <span className="text-x-text-sec -mt-0.5 text-xs sm:text-sm">
                {username}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-x-5 px-1.5">
              <div className="flex items-center gap-x-1">
                <span className="text-x-text text-xs font-medium sm:text-sm">
                  0
                </span>
                <span className="text-x-text-sec text-[11px] sm:text-xs">
                  Following
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <span className="text-x-text text-xs font-medium sm:text-sm">
                  0
                </span>
                <span className="text-x-text-sec text-[11px] sm:text-xs">
                  Followers
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-y-4">
            <MobileLink
              path={`/profile/${id}`}
              icon={<User2Icon className="size-6" />}
              label="Profile"
            />
            <MobileLink
              path="/bookmarks"
              icon={<BookmarkIcon className="size-6" />}
              label="Bookmarks"
            />
            <MobileLink
              path="/settings"
              icon={<Settings className="size-6" />}
              label="Settings and privacy"
            />
            <MobileLink
              path="/logout"
              icon={<LogOutIcon className="size-6" />}
              label="Log out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderForPhone;
