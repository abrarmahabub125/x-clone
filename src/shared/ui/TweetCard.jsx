import {
  BadgeCheck,
  BarChart2,
  Bookmark,
  Heart,
  MapPin,
  MoreHorizontal,
  Repeat2,
  TriangleAlert,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { fetcher } from "../../../fetcher";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { hasRecentTweetView, rememberTweetView } from "../lib/tweetViewCache";
import { formatNumber } from "../utils/formatNumber";
import { formatTweetTime } from "../utils/formatTweetTime";

const actionBaseClass =
  "group inline-flex items-center gap-1.5 rounded-full text-x-text-sec transition-colors duration-200";

const TweetCard = ({
  _id,
  userId,
  content,
  media,
  location,
  likesCount,
  viewsCount,
  retweetsCount,
  createdAt,
  user,
  isLiked: initialIsLiked = false,
  isBookmarked: initialIsBookmarked = false,
  isRetweeted: initialIsRetweeted = false,
  onLikeChange,
  onBookmarkChange,
  onViewChange,
  onRetweetChange,
  onDelete,
}) => {
  const { user: loggedInUser } = useAuth();
  const articleRef = useRef(null);
  const hasTrackedViewRef = useRef(false);
  const menuRef = useRef(null);
  const [isLiked, setLiked] = useState(Boolean(initialIsLiked));
  const [currentLikesCount, setCurrentLikesCount] = useState(
    Number(likesCount) || 0,
  );
  const [currentViewsCount, setCurrentViewsCount] = useState(
    Number(viewsCount) || 0,
  );
  const [isRetweeted, setRetweeted] = useState(Boolean(initialIsRetweeted));
  const [currentRetweetsCount, setCurrentRetweetsCount] = useState(
    Number(retweetsCount) || 0,
  );
  const [isLikePending, setIsLikePending] = useState(false);
  const [isBookmarked, setBookmarked] = useState(Boolean(initialIsBookmarked));
  const [isBookmarkPending, setIsBookmarkPending] = useState(false);
  const [isRetweetPending, setIsRetweetPending] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setLiked(Boolean(initialIsLiked));
    setCurrentLikesCount(Number(likesCount) || 0);
  }, [initialIsLiked, likesCount, _id]);

  useEffect(() => {
    setBookmarked(Boolean(initialIsBookmarked));
  }, [initialIsBookmarked, _id]);

  useEffect(() => {
    setCurrentViewsCount(Number(viewsCount) || 0);
  }, [viewsCount, _id]);

  useEffect(() => {
    setRetweeted(Boolean(initialIsRetweeted));
    setCurrentRetweetsCount(Number(retweetsCount) || 0);
  }, [initialIsRetweeted, retweetsCount, _id]);

  useEffect(() => {
    hasTrackedViewRef.current = false;
  }, [_id, loggedInUser?.id]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isDeleteModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === "Escape" && !isDeletePending) {
        setIsDeleteModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDeleteModalOpen, isDeletePending]);

  useEffect(() => {
    if (!_id || !loggedInUser?.id) {
      return undefined;
    }

    const viewerId = loggedInUser.id;

    if (hasRecentTweetView(viewerId, _id)) {
      hasTrackedViewRef.current = true;
      return undefined;
    }

    const tweetElement = articleRef.current;

    if (!tweetElement) {
      return undefined;
    }

    let isCancelled = false;

    const recordView = async () => {
      if (isCancelled || hasTrackedViewRef.current) {
        return;
      }

      hasTrackedViewRef.current = true;

      try {
        const result = await fetcher(`/api/tweets/${_id}/views`, {
          method: "POST",
        });

        if (isCancelled) {
          return;
        }

        const resolvedViewsCount = Number.isFinite(result?.data?.viewsCount)
          ? result.data.viewsCount
          : Number(viewsCount) || 0;

        setCurrentViewsCount(resolvedViewsCount);
        rememberTweetView(viewerId, _id);
        onViewChange?.(_id, {
          isViewCounted: Boolean(result?.data?.isViewCounted),
          viewsCount: resolvedViewsCount,
        });
      } catch {
        hasTrackedViewRef.current = false;
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      void recordView();

      return () => {
        isCancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting && entry.intersectionRatio >= 0.6) {
          observer.disconnect();
          void recordView();
        }
      },
      {
        threshold: [0.6],
      },
    );

    observer.observe(tweetElement);

    return () => {
      isCancelled = true;
      observer.disconnect();
    };
  }, [_id, loggedInUser?.id, onViewChange, viewsCount]);

  const {
    fullName = "Unknown User",
    username = "",
    profilePic = "",
  } = user ?? {};
  const authorHref = userId ? `/profile/${userId}` : null;
  const isOwnTweet = loggedInUser?.id === userId;
  const timestamp = formatTweetTime(createdAt);
  const likes = formatNumber(currentLikesCount);
  const retweets = formatNumber(currentRetweetsCount);
  const views = formatNumber(currentViewsCount);

  const toggleLike = async (tweetId) => {
    if (isLikePending) {
      return;
    }

    if (!loggedInUser?.id) {
      toast.error("You need to be signed in to like a post.");
      return;
    }

    const previousIsLiked = isLiked;
    const previousLikesCount = currentLikesCount;
    const nextIsLiked = !previousIsLiked;
    const nextLikesCount = Math.max(
      0,
      previousLikesCount + (nextIsLiked ? 1 : -1),
    );

    setLiked(nextIsLiked);
    setCurrentLikesCount(nextLikesCount);
    setIsLikePending(true);

    try {
      const result = await fetcher(`/api/tweets/${tweetId}/likes`, {
        method: previousIsLiked ? "DELETE" : "POST",
      });

      const resolvedIsLiked = result?.data?.isLiked ?? nextIsLiked;
      const resolvedLikesCount = Number.isFinite(result?.data?.likesCount)
        ? result.data.likesCount
        : nextLikesCount;

      setLiked(resolvedIsLiked);
      setCurrentLikesCount(resolvedLikesCount);
      onLikeChange?.(tweetId, {
        isLiked: resolvedIsLiked,
        likesCount: resolvedLikesCount,
        previousIsLiked,
        previousLikesCount,
      });
    } catch (err) {
      setLiked(previousIsLiked);
      setCurrentLikesCount(previousLikesCount);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLikePending(false);
    }
  };

  const addPostToBookmarks = async (tweetId) => {
    if (isBookmarkPending) {
      return;
    }

    const prevState = isBookmarked;
    const nextState = !prevState;

    setBookmarked(nextState);
    setIsBookmarkPending(true);

    try {
      let result;

      if (prevState) {
        result = await fetcher(`/api/bookmarks/${tweetId}`, {
          method: "DELETE",
        });

        toast.success(result?.message || "Removed from bookmarks");
      } else {
        result = await fetcher(`/api/bookmarks`, {
          method: "POST",
          body: JSON.stringify({ tweetId }),
        });

        toast.success(result?.message || "Added to bookmarks");
      }

      onBookmarkChange?.(tweetId, nextState);
    } catch (err) {
      setBookmarked(prevState);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsBookmarkPending(false);
    }
  };

  const toggleRetweet = async (tweetId) => {
    if (isRetweetPending) {
      return;
    }

    if (!loggedInUser?.id) {
      toast.error("You need to be signed in to repost a post.");
      return;
    }

    const previousIsRetweeted = isRetweeted;
    const previousRetweetsCount = currentRetweetsCount;
    const nextIsRetweeted = !previousIsRetweeted;
    const nextRetweetsCount = Math.max(
      0,
      previousRetweetsCount + (nextIsRetweeted ? 1 : -1),
    );

    setRetweeted(nextIsRetweeted);
    setCurrentRetweetsCount(nextRetweetsCount);
    setIsRetweetPending(true);

    try {
      const result = await fetcher(`/api/tweets/${tweetId}/retweets`, {
        method: previousIsRetweeted ? "DELETE" : "POST",
      });

      const resolvedIsRetweeted = result?.data?.isRetweeted ?? nextIsRetweeted;
      const resolvedRetweetsCount = Number.isFinite(result?.data?.retweetsCount)
        ? result.data.retweetsCount
        : nextRetweetsCount;

      setRetweeted(resolvedIsRetweeted);
      setCurrentRetweetsCount(resolvedRetweetsCount);
      onRetweetChange?.(tweetId, {
        isRetweeted: resolvedIsRetweeted,
        retweetsCount: resolvedRetweetsCount,
      });
    } catch (err) {
      setRetweeted(previousIsRetweeted);
      setCurrentRetweetsCount(previousRetweetsCount);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsRetweetPending(false);
    }
  };

  const handleDelete = async () => {
    if (!isOwnTweet || isDeletePending) {
      return;
    }

    setIsDeletePending(true);

    try {
      const result = await fetcher(`/api/tweets/${_id}`, {
        method: "DELETE",
      });

      setIsDeleteModalOpen(false);
      onDelete?.(_id);
      toast.success(result?.message || "Tweet deleted successfully.");
    } catch (err) {
      toast.error(err.message || "Could not delete the post.");
    } finally {
      setIsDeletePending(false);
    }
  };

  return (
    <article
      ref={articleRef}
      className="border-x-divider hover:bg-x-surface/40 flex gap-3 border-b px-4 py-3 transition-colors duration-200"
    >
      <Link to={authorHref}>
        <div className="size-9 shrink-0 overflow-hidden rounded-full lg:size-10">
          <img
            className="h-full w-full object-cover object-center"
            src={
              profilePic
                ? profilePic
                : "https://i.ibb.co.com/jZZHbNL5/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-f.jpg"
            }
            alt={`${fullName} avatar`}
          />
        </div>
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[15px] leading-5">
              {authorHref ? (
                <Link to={authorHref}>
                  <span className="text-x-text truncate text-sm font-semibold hover:underline lg:text-base">
                    {fullName}
                  </span>
                </Link>
              ) : (
                <span className="text-x-text truncate text-sm font-semibold hover:underline lg:text-base">
                  {fullName}
                </span>
              )}
              <BadgeCheck className="fill-x-blue text-x-bg size-4" />
              {username && (
                <span className="text-x-text-sec truncate text-sm lg:text-base">
                  @{username}
                </span>
              )}
              {timestamp && (
                <span className="text-x-text-sec text-xs lg:text-sm">
                  <svg
                    fill="#828385"
                    width="13px"
                    height="13px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path>
                    </g>
                  </svg>
                </span>
              )}
              {timestamp && (
                <span className="text-x-text-sec text-xs lg:text-sm">
                  {timestamp}
                </span>
              )}
            </div>
            {location && (
              <div className="text-x-text-sec mt-0.5 flex items-center gap-1.5 text-xs font-medium">
                <MapPin className="size-3.5" />
                <span className="truncate">{location}</span>
              </div>
            )}
          </div>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
              className="hover:bg-x-surface inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
            >
              <MoreHorizontal className="text-x-text-sec size-4" />
            </button>

            {isMenuOpen && (
              <div className="border-x-divider bg-x-bg absolute right-0 z-20 mt-2 min-w-44 rounded-2xl border py-1 shadow-xl">
                {isOwnTweet ? (
                  <button
                    type="button"
                    disabled={isDeletePending}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-x-red hover:bg-x-surface block w-full px-4 py-2 text-left text-sm font-medium disabled:opacity-60"
                  >
                    {isDeletePending ? "Deleting..." : "Delete post"}
                  </button>
                ) : (
                  <div className="text-x-text-sec px-4 py-2 text-sm">
                    No actions available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 space-y-3">
          {content && (
            <p className="text-x-text text-[15px] leading-6 whitespace-pre-line">
              {content}
            </p>
          )}

          {media && (
            <div className="border-x-divider overflow-hidden rounded-2xl border">
              <img
                className="h-auto max-h-128 w-full object-cover object-center"
                src={media}
                alt="tweet media"
              />
            </div>
          )}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2 text-sm">
          <button
            type="button"
            disabled={isRetweetPending}
            onClick={() => toggleRetweet(_id)}
            className={`${actionBaseClass} ${isRetweeted ? "text-x-green" : "hover:text-x-green"} disabled:cursor-not-allowed disabled:opacity-70`}
          >
            <span
              className={`${isRetweeted ? "bg-x-green/10" : "group-hover:bg-x-green/10"} inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200`}
            >
              <Repeat2 className="size-4" />
            </span>
            <span>{retweets}</span>
          </button>

          <button
            type="button"
            disabled={isLikePending}
            onClick={() => toggleLike(_id)}
            className={`${actionBaseClass} ${isLiked ? "text-x-red" : "hover:text-x-red"} disabled:cursor-not-allowed disabled:opacity-70`}
          >
            <span
              className={`${isLiked ? "bg-x-red/10" : "group-hover:bg-x-red/10"} inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200`}
            >
              <Heart
                className={isLiked ? "text-x-red fill-x-red size-4" : "size-4"}
              />
            </span>
            <span>{likes}</span>
          </button>

          <button className={`${actionBaseClass} hover:text-x-blue`}>
            <span className="group-hover:bg-x-blue/10 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
              <BarChart2 className="size-4" />
            </span>
            <span>{views}</span>
          </button>

          <div className="text-x-text-sec flex items-center justify-end gap-1">
            <button
              type="button"
              disabled={isBookmarkPending}
              onClick={() => addPostToBookmarks(_id)}
              className="hover:text-x-blue disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="hover:bg-x-blue/10 inline-flex size-8 items-center justify-center rounded-full transition-colors duration-200">
                <Bookmark
                  className={
                    isBookmarked ? "text-x-blue fill-x-blue size-4" : "size-4"
                  }
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/65 px-4 py-4 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => !isDeletePending && setIsDeleteModalOpen(false)}
            aria-hidden="true"
          />

          <div className="bg-x-bg border-x-divider relative z-121 w-full max-w-md overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="border-x-divider flex items-center justify-between gap-3 border-b px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-x-red/10 text-x-red inline-flex size-11 items-center justify-center rounded-full">
                  <TriangleAlert className="size-5" />
                </div>
                <div>
                  <h3 className="text-x-text text-base font-bold md:text-lg">
                    Delete post
                  </h3>
                  <p className="text-x-text-sec text-xs md:text-sm">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="hover:bg-x-surface inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200"
                onClick={() => !isDeletePending && setIsDeleteModalOpen(false)}
                disabled={isDeletePending}
                aria-label="Close delete modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="px-5 py-4">
              <p className="text-x-text text-sm leading-6 md:text-[15px]">
                This post will be removed from your profile and timeline. Likes,
                reposts, bookmarks, and tracked views linked to it will also be
                cleared.
              </p>
            </div>

            <div className="border-x-divider flex items-center justify-end gap-3 border-t px-5 py-4">
              <button
                type="button"
                className="border-x-divider hover:bg-x-surface rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeletePending}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-x-red rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleDelete}
                disabled={isDeletePending}
              >
                {isDeletePending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default TweetCard;
