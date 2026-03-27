import { Link } from "react-router";
import { Plus } from "lucide-react";
import {
  BookmarkIcon,
  User2Icon,
  UserPlus2Icon,
  ListTodoIcon,
  SquareArrowOutUpRightIcon,
  Settings,
  MicIcon,
  ZapIcon,
  LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import MyImage from "../../../shared/assets/logo/my-photo.jpg";
import XLogo from "../../../shared/assets/logo/x-logo.svg";
import MobileLink from "../../../shared/navigation/components/MobileLink";

const HeaderForPhone = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="px-4 pt-2">
      <div className="grid w-full grid-cols-3 grid-rows-1 gap-x-4">
        <div className="flex items-center justify-start">
          <button
            onClick={() => setIsNavOpen(true)}
            className="size-9 cursor-pointer overflow-hidden rounded-full"
          >
            <img
              className="h-full w-full object-cover object-center"
              src={MyImage}
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
          <button className="border-x-divider inline-block w-fit rounded-full border px-4 py-1.5">
            Subscribe
          </button>
        </div>
      </div>

      <div
        onClick={() => setIsNavOpen(false)}
        className={`bg-x-bg/40 fixed top-0 left-0 h-screen w-full -translate-x-full transition-all duration-200 ${isNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-x-bg shadow-x-text-ter border-x-divider h-full w-fit border-r p-3 shadow-2xl">
          <div>
            <div className="flex items-center justify-between px-1.5">
              <div className="border-x-divider size-10 overflow-hidden rounded-full border">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={MyImage}
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
                Abrar Mahabub
              </span>
              <span className="text-x-text-sec -mt-0.5 text-xs sm:text-sm">
                @abrar_mahabub
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
              path="/profile/123"
              icon={<User2Icon className="size-6" />}
              label="Profile"
            />
            <MobileLink
              path="/connect-people"
              icon={<UserPlus2Icon className="size-6" />}
              label="Follow"
            />
            <MobileLink
              path="/bookmarks"
              icon={<BookmarkIcon className="size-6" />}
              label="Bookmarks"
            />
            <MobileLink
              path="/list"
              icon={<ListTodoIcon className="size-6" />}
              label="Lists"
            />
            <MobileLink
              path="/ads-center"
              icon={<SquareArrowOutUpRightIcon className="size-6" />}
              label="Ads"
            />
            <MobileLink
              path="/create-space"
              icon={<MicIcon className="size-6" />}
              label="Create your Space"
            />
            <MobileLink
              path="/business"
              icon={<ZapIcon className="size-6" />}
              label="Business"
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
