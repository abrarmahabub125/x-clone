import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "../features/auth/routes/ProtectedRoute";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import LoginPage from "../features/auth/pages/Login";
import Logout from "../features/auth/pages/Logout";
import NotFoundPage from "../shared/ui/NotFoundPage";

const App = lazy(() => import("./App"));
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const HomePage = lazy(() => import("../features/home/pages/HomePage"));
const ExplorePage = lazy(() => import("../features/explore/pages/ExplorePage"));
const NotificationsPage = lazy(
  () => import("../features/notifications/pages/NotificationsPage"),
);
const FollowSuggestionsPage = lazy(
  () => import("../features/follow/pages/FollowSuggestionsPage"),
);
const BookMarkPage = lazy(
  () => import("../features/bookmarks/pages/BookMarkPage"),
);
const UserProfilePage = lazy(
  () => import("../features/profile/pages/UserProfilePage"),
);
const ProfilePostsPage = lazy(
  () => import("../features/profile/pages/ProfilePostsPage"),
);
const ProfileRepliesPage = lazy(
  () => import("../features/profile/pages/ProfileRepliesPage"),
);
const ProfileMediaPage = lazy(
  () => import("../features/profile/pages/ProfileMediaPage"),
);
const ProfileLikesPage = lazy(
  () => import("../features/profile/pages/ProfileLikesPage"),
);
const SettingsAndPrivacyPage = lazy(
  () => import("../features/settings/pages/SettingsAndPrivacyPage"),
);
const BusinessPage = lazy(
  () => import("../features/business/pages/BusinessPage"),
);

const CreatePostModal = lazy(
  () => import("../features/post/pages/CreatePostModal"),
);
const AllNotifications = lazy(
  () => import("../features/notifications/components/AllNotifications"),
);
const AllMentions = lazy(
  () => import("../features/notifications/components/AllMentions"),
);
const ForYou = lazy(() => import("../features/explore/components/ForYou"));
const Trending = lazy(() => import("../features/explore/components/Trending"));
const News = lazy(() => import("../features/explore/components/News"));
const Sports = lazy(() => import("../features/explore/components/Sports"));
const Entertainment = lazy(
  () => import("../features/explore/components/Entertainment"),
);
const CreatorsForYou = lazy(
  () => import("../features/follow/components/CreatorsForYou"),
);
const FollowHome = lazy(
  () => import("../features/follow/components/FollowHome"),
);

//Authentication Pages
const RegisterPage = lazy(() => import("../features/auth/pages/Registration"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <h1>Hello World!</h1>,
    children: [
      { path: "register", Component: RegisterPage },
      { path: "login", Component: LoginPage },
      { path: "registration/verify-email", Component: VerifyOtp },
      {
        path: "logout",
        Component: Logout,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RootLayout />,
            children: [
              { index: true, Component: HomePage },
              { path: "following", Component: HomePage },
              { path: "compose/post", Component: CreatePostModal },
              {
                path: "explore",
                Component: ExplorePage,
                children: [
                  { index: true, Component: ForYou },
                  { path: "trending", Component: Trending },
                  { path: "news", Component: News },
                  { path: "sports", Component: Sports },
                  { path: "entertainment", Component: Entertainment },
                ],
              },
              {
                path: "notifications",
                Component: NotificationsPage,
                children: [
                  { index: true, Component: AllNotifications },
                  { path: "mentions", Component: AllMentions },
                ],
              },
              {
                path: "connect-people",
                Component: FollowSuggestionsPage,
                children: [
                  { index: true, Component: FollowHome },
                  {
                    path: "creators_for_you",
                    Component: CreatorsForYou,
                  },
                ],
              },
              { path: "bookmarks", Component: BookMarkPage },
              {
                path: "profile/:userId",
                Component: UserProfilePage,
                loader: async ({ params }) => {
                  const result = await fetch(
                    `http://localhost:3000/api/users/${params.userId}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                    },
                  );
                  if (!result.ok) {
                    throw new Response("Failed to fetch user profile", {
                      status: result.status,
                    });
                  }

                  const data = await result.json();
                  return data;
                },
                children: [
                  { index: true, Component: ProfilePostsPage },
                  { path: "replies", Component: ProfileRepliesPage },
                  { path: "media", Component: ProfileMediaPage },
                  { path: "likes", Component: ProfileLikesPage },
                ],
              },
              { path: "settings", Component: SettingsAndPrivacyPage },
              { path: "business", Component: BusinessPage },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export { router };
