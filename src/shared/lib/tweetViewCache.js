const STORAGE_KEY = "x-clone:tweet-view-cache";
const VIEW_WINDOW_MS = 24 * 60 * 60 * 1000;

function readCache() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawCache = window.localStorage.getItem(STORAGE_KEY);

    if (!rawCache) {
      return {};
    }

    const parsedCache = JSON.parse(rawCache);

    return parsedCache && typeof parsedCache === "object" ? parsedCache : {};
  } catch {
    return {};
  }
}

function writeCache(cache) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage write failures and fall back to backend protection.
  }
}

function buildCacheKey(userId, tweetId) {
  return `${userId}:${tweetId}`;
}

function pruneExpiredEntries(cache, now = Date.now()) {
  let hasChanges = false;
  const nextCache = {};

  for (const [key, value] of Object.entries(cache)) {
    if (typeof value !== "number") {
      hasChanges = true;
      continue;
    }

    if (now - value >= VIEW_WINDOW_MS) {
      hasChanges = true;
      continue;
    }

    nextCache[key] = value;
  }

  return {
    cache: nextCache,
    hasChanges,
  };
}

export function hasRecentTweetView(userId, tweetId) {
  if (!userId || !tweetId) {
    return false;
  }

  const now = Date.now();
  const { cache, hasChanges } = pruneExpiredEntries(readCache(), now);

  if (hasChanges) {
    writeCache(cache);
  }

  return typeof cache[buildCacheKey(userId, tweetId)] === "number";
}

export function rememberTweetView(userId, tweetId) {
  if (!userId || !tweetId) {
    return;
  }

  const { cache } = pruneExpiredEntries(readCache());
  cache[buildCacheKey(userId, tweetId)] = Date.now();
  writeCache(cache);
}
