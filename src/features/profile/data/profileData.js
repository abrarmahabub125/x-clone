import MyPhoto from "../../../shared/assets/logo/my-photo.jpg";

export const profileInfo = {
  name: "Abrar Mahabub",
  handle: "abrar_mahabub",
  bio: "Frontend developer focused on React UI, clean layouts, and building polished product experiences. Recreating X with attention to real structure and interaction details.",
  location: "Dhaka, Bangladesh",
  website: "https://x.com/abrar_mahabub",
  websiteLabel: "x.com/abrar_mahabub",
  joined: "Joined January 2024",
  following: "420",
  followers: "12.7K",
  totalPosts: 142,
  avatar: MyPhoto,
  bannerClass:
    "bg-[linear-gradient(135deg,#1d9bf0_0%,#0f172a_55%,#101820_100%)]",
};

export const profilePosts = [
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

export const profileReplies = [
  {
    id: 4,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "5h",
    content:
      "Replying to @frontend_morshed\n\nTotally agree. Once the reusable primitives are stable, the rest of the product gets much easier to scale without visual drift.",
    avatar: MyPhoto,
    verified: true,
    replies: 4,
    reposts: 2,
    likes: 39,
    views: "2.1K",
  },
  {
    id: 5,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "Mar 26",
    content:
      "Replying to @rifat_codes\n\nNested routes felt like the cleanest way to make the profile tabs behave like the real app while keeping the page components small.",
    avatar: MyPhoto,
    verified: true,
    replies: 7,
    reposts: 1,
    likes: 52,
    views: "3.8K",
  },
];

export const profileMedia = profilePosts.filter((post) => post.image).concat([
  {
    id: 6,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "Mar 18",
    content:
      "A quick preview of the current profile header polish pass. Still tuning spacing, but the overall structure is getting there.",
    avatar: MyPhoto,
    verified: true,
    image: MyPhoto,
    replies: 15,
    reposts: 8,
    likes: 167,
    views: "10.6K",
  },
]);

export const likedPosts = [
  {
    id: 7,
    author: "Design Habit",
    handle: "designhabit",
    time: "8h",
    content:
      "The fastest way to make a UI feel premium is consistency in spacing, density, and interaction feedback.",
    avatar: MyPhoto,
    verified: true,
    replies: 31,
    reposts: 64,
    likes: 428,
    views: "28K",
  },
  {
    id: 8,
    author: "React Bangladesh",
    handle: "reactbd",
    time: "Mar 25",
    content:
      "Routing-based tabs are still one of the cleanest patterns for profile and dashboard sections in React Router apps.",
    avatar: MyPhoto,
    replies: 12,
    reposts: 21,
    likes: 189,
    views: "11.4K",
  },
  {
    id: 9,
    author: "Abrar Mahabub",
    handle: "abrar_mahabub",
    time: "Mar 21",
    content:
      "Saving layout decisions in reusable components pays off every single time a new page gets added.",
    avatar: MyPhoto,
    verified: true,
    replies: 9,
    reposts: 6,
    likes: 88,
    views: "5.3K",
  },
];
