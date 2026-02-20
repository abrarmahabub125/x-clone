import Logo from "../assets/logo/x-logo.svg";
import { Link, NavLink, useLocation } from "react-router";
import MainLink from "../components/HeaderComponents/MainLink";
import {
  Home,
  Search,
  Bell,
  BookmarkIcon,
  User2Icon,
  UserPlus2Icon,
  Users2Icon,
  ListTodoIcon,
  SquareArrowOutUpRightIcon,
  CircleEllipsisIcon,
  EllipsisIcon,
  Settings,
  MicIcon,
  ZapIcon,
} from "lucide-react";

import MyPhoto from "../assets/logo/my-photo.jpg";
import TweetIcon from "../assets/tweet-icon.jpg";
import { useState } from "react";
import MorePopUp from "../components/HeaderComponents/MorePopUp";

const MainSidebar = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isAccountPopUpOpen, setIsAccountPopUpOpen] = useState(false);

  const location = useLocation();

  //=============================

  return (
    <div className="hidden h-full w-full flex-col justify-between gap-y-px md:flex">
      <div className="h-full">
        {/* Root Navigation  */}
        <div>
          <div className="py-1">
            <div>
              <Link
                to="/"
                className="hover:bg-x-surface inline-flex size-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
              >
                <img className="size-6 object-cover" src={Logo} alt="x-logo" />
              </Link>
            </div>
          </div>
        </div>

        {/* More List button  */}
        <div className="flex flex-col justify-start gap-y-1">
          <MainLink path={"/"} icon={<Home />} label={"Home"} />
          <MainLink path={"/explore"} icon={<Search />} label={"Explore"} />
          <MainLink
            path={"/notifications"}
            icon={<Bell />}
            label={"Notifications"}
          />
          <MainLink
            path={"/connect-people"}
            icon={<UserPlus2Icon />}
            label={"Follow"}
          />
          <MainLink
            path={"/bookmarks"}
            icon={<BookmarkIcon />}
            label={"Bookmarks"}
          />
          <MainLink
            path={"/profile/123"}
            icon={<User2Icon />}
            label={"Profile"}
          />
          <MainLink path={"/list"} icon={<ListTodoIcon />} label={"Lists"} />
          <MainLink
            path={"/communities"}
            icon={<Users2Icon />}
            label={"Communities"}
          />
          <MainLink
            path={"/ads-center"}
            icon={<SquareArrowOutUpRightIcon />}
            label={"Ads"}
          />

          {/* Sub menu  */}
          <button
            onClick={() => {
              setIsAccountPopUpOpen(false);
              setIsPopUpOpen(!isPopUpOpen);
            }}
            className="group flex justify-self-start"
          >
            <div>
              {/* settings modal component */}
              <div className="relative">
                {isPopUpOpen && (
                  <MorePopUp>
                    <div>
                      <NavLink to="/create-space">
                        <div className="px-1 py-2">
                          <div className="flex items-center gap-1.5 rounded-full transition-colors duration-200">
                            <div className="flex size-8 items-center justify-center rounded-full">
                              <MicIcon className="size-5" />
                            </div>
                            <div className="h-full pr-6 pl-1">
                              <span className="text-base whitespace-nowrap sm:text-lg">
                                Create your Space
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/business">
                        <div className="px-1 py-2">
                          <div className="flex items-center gap-1.5 rounded-full transition-colors duration-200">
                            <div className="flex size-8 items-center justify-center rounded-full">
                              <ZapIcon className="size-5" />
                            </div>
                            <div className="h-full pr-6 pl-1">
                              <span className="text-base whitespace-nowrap sm:text-lg">
                                Business
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/settings">
                        <div className="px-1 py-2">
                          <div className="flex items-center gap-1.5 rounded-full transition-colors duration-200">
                            <div className="flex size-8 items-center justify-center rounded-full">
                              <Settings className="size-5" />
                            </div>
                            <div className="h-full pr-6 pl-1">
                              <span className="text-base whitespace-nowrap sm:text-lg">
                                Settings and privacy
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </MorePopUp>
                )}
              </div>
              <div className="group-hover:bg-x-surface inline-flex items-center justify-start gap-1.5 rounded-full transition-colors duration-200">
                <div className="hover:bg-x-surface flex size-12 items-center justify-center rounded-full">
                  <CircleEllipsisIcon />
                </div>
                <div className="hidden h-full pr-6 pl-1 lg:block">
                  <span className="text-lg font-normal sm:text-xl">More</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Tweet post button  */}
        <div>
          <Link
            to="/compose/post"
            state={{ backgroundLocation: location }}
            className="bg-x-bgOpposite mt-6 hidden rounded-full py-3 transition-opacity duration-200 hover:opacity-95 lg:block"
          >
            <div className="flex w-full items-center justify-center">
              <span className="text-x-textOpposite text-base font-semibold sm:text-lg">
                Post
              </span>
            </div>
          </Link>
          {/* tweet icon button  */}
          <Link
            to="/compose/post"
            className="bg-x-bgOpposite rounded-full lg:hidden"
          >
            <div className="bg-x-bgOpposite mt-8 flex size-12 w-full items-center justify-center overflow-hidden rounded-full transition-opacity duration-200 hover:opacity-95">
              <img className="size-7 object-cover" src={TweetIcon} alt="icon" />
            </div>
          </Link>
        </div>
      </div>

      {/* User accounts avatar  */}
      <div className="mb-4">
        <div className="relative" onClick={() => setIsAccountPopUpOpen(false)}>
          {isAccountPopUpOpen && (
            <MorePopUp>
              <div>
                <NavLink to="/login">
                  <div className="hover:bg-x-surface rounded-full px-2 py-2.5 transition-colors duration-200">
                    <div className="flex items-center gap-1.5 rounded-full transition-colors duration-200">
                      <div className="h-full pr-6 pl-1">
                        <span className="text-sm whitespace-nowrap sm:text-base">
                          Add an existing account
                        </span>
                      </div>
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/logout">
                  <div className="hover:bg-x-surface rounded-full px-2 py-2.5 transition-colors duration-200">
                    <div className="flex items-center gap-1.5 rounded-full transition-colors duration-200">
                      <div className="h-full pr-6 pl-1">
                        <span className="text-sm whitespace-nowrap sm:text-base">
                          Log out @abrar_mahabub
                        </span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            </MorePopUp>
          )}
        </div>
        <button
          onClick={() => {
            setIsPopUpOpen(false);
            setIsAccountPopUpOpen(!isAccountPopUpOpen);
          }}
          className="hover:bg-x-surface flex w-full cursor-pointer items-center justify-between gap-x-4 rounded-full px-0.5 py-1 lg:px-2"
        >
          <div className="flex w-full items-center justify-center gap-3 lg:justify-start">
            <div className="size-10 rounded-full">
              <img
                className="h-full w-full rounded-full object-cover"
                src={MyPhoto}
                alt="user_profile_pic"
              />
            </div>
            <div className="hidden flex-col justify-start lg:flex">
              <span className="text-x-text cursor-pointer text-sm font-medium sm:text-base">
                Abrar Mahabub
              </span>
              <span className="text-x-text-sec cursor-pointer text-sm font-light sm:text-base">
                @abrar_mahabub
              </span>
            </div>
          </div>
          <div className="hover:bg-x-surface hidden size-7 cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors duration-200 lg:flex">
            <EllipsisIcon className="size-5" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
