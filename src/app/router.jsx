import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import RouteProtector from "../features/auth/routes/RouteProtector";

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
const ListPage = lazy(() => import("../features/lists/pages/ListPage"));
const CommunitiesPage = lazy(
  () => import("../features/communities/pages/CommunitiesPage"),
);
const AdsCenter = lazy(() => import("../features/ads/pages/AdsCenter"));
const SettingsAndPrivacyPage = lazy(
  () => import("../features/settings/pages/SettingsAndPrivacyPage"),
);
const BusinessPage = lazy(
  () => import("../features/business/pages/BusinessPage"),
);
const CreateYourSpace = lazy(
  () => import("../features/spaces/pages/CreateYourSpace"),
);
const CreatePostModal = lazy(
  () => import("../features/post/pages/CreatePostModal"),
);
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const SignUpPage = lazy(() => import("../features/auth/pages/SignUpPage"));
const VerifyOtpPage = lazy(() => import("../features/auth/pages/VerifyOtpPage"));
const LogoutPage = lazy(() => import("../features/auth/pages/LogoutPage"));
const AllNotifications = lazy(
  () => import("../features/notifications/components/AllNotifications"),
);
const AllMentions = lazy(
  () => import("../features/notifications/components/AllMentions"),
);
const ForYou = lazy(() => import("../features/explore/components/ForYou"));
const Trending = lazy(
  () => import("../features/explore/components/Trending"),
);
const News = lazy(() => import("../features/explore/components/News"));
const Sports = lazy(() => import("../features/explore/components/Sports"));
const Entertainment = lazy(
  () => import("../features/explore/components/Entertainment"),
);
const CreatorsForYou = lazy(
  () => import("../features/follow/components/CreatorsForYou"),
);
const FollowHome = lazy(() => import("../features/follow/components/FollowHome"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <h1>Hello World!</h1>,
    children: [
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignUpPage },
      { path: "signup/verify", Component: VerifyOtpPage },
      { path: "logout", Component: LogoutPage },
      {
        element: <RouteProtector />,
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
                children: [
                  { index: true, Component: ProfilePostsPage },
                  { path: "replies", Component: ProfileRepliesPage },
                  { path: "media", Component: ProfileMediaPage },
                  { path: "likes", Component: ProfileLikesPage },
                ],
              },
              { path: "list", Component: ListPage },
              { path: "communities", Component: CommunitiesPage },
              { path: "ads-center", Component: AdsCenter },
              { path: "create-space", Component: CreateYourSpace },
              { path: "settings", Component: SettingsAndPrivacyPage },
              { path: "business", Component: BusinessPage },
            ],
          },
        ],
      },
    ],
  },
]);

export { router };

