import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import RouteProtector from "../RouteProtector";

// Main routes pages
const App = lazy(() => import("../App"));
const RootLayout = lazy(() => import("../layouts/RootLayout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const ExplorePage = lazy(() => import("../pages/ExplorePage"));
const NotificationsPage = lazy(() => import("../pages/NotificationsPage"));
const FollowSuggestionsPage = lazy(
  () => import("../pages/FollowSuggestionsPage"),
);
const BookMarkPage = lazy(() => import("../pages/BookMarkPage"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const ListPage = lazy(() => import("../pages/ListPage"));
const CommunitiesPage = lazy(() => import("../pages/CommunitiesPage"));
const AdsCenter = lazy(() => import("../pages/AdsCenter"));
const SettingsAndPrivacyPage = lazy(
  () => import("../pages/SettingsAndPrivacyPage"),
);
const BusinessPage = lazy(() => import("../pages/BusinessPage"));
const CreateYourSpace = lazy(() => import("../pages/CreateYourSpace"));
const CreatePostModal = lazy(() => import("../pages/CreatePostModal"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const LogoutPage = lazy(() => import("../pages/LogoutPage"));
const AllNotifications = lazy(
  () => import("../components/NotificationComponent/AllNotifications"),
);
const AllMentions = lazy(
  () => import("../components/NotificationComponent/AllMentions"),
);

// ===================== Explore components ==============================
const ForYou = lazy(() => import("../components/ExploreComponents/ForYou"));
const Trending = lazy(() => import("../components/ExploreComponents/Trending"));
const News = lazy(() => import("../components/ExploreComponents/News"));
const Sports = lazy(() => import("../components/ExploreComponents/Sports"));
const Entertainment = lazy(
  () => import("../components/ExploreComponents/Entertainment"),
);

// ===================== Creators components ================================
const CreatorsForYou = lazy(
  () => import("../components/FollowComponents/CreatorsForYou"),
);
const FollowHome = lazy(
  () => import("../components/FollowComponents/FollowHome"),
);
// ==========================================================================
// |
// |
// | ============================  App Routes ===============================
// |
// |
// ==========================================================================

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <h1>Hello World!</h1>,
    children: [
      { path: "login", Component: LoginPage },
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
                  {
                    index: true,
                    Component: FollowHome,
                  },

                  {
                    path: "creators_for_you",
                    Component: CreatorsForYou,
                  },
                ],
              },
              { path: "bookmarks", Component: BookMarkPage },
              { path: "profile/:userId", Component: UserProfilePage },
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
