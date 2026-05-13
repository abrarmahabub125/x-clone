export function updateTweetById(tweets, tweetId, changes) {
  return tweets.map((tweet) =>
    tweet._id === tweetId ? { ...tweet, ...changes } : tweet,
  );
}

export function removeTweetById(tweets, tweetId) {
  return tweets.filter((tweet) => tweet._id !== tweetId);
}

export function mergeTweetChangesById(tweets, tweetId, changes) {
  return updateTweetById(tweets, tweetId, changes);
}

export function mergeUniqueTweets(existingTweets, incomingTweets) {
  const seenIds = new Set();
  const mergedTweets = [];

  for (const tweet of existingTweets) {
    const tweetId = tweet?._id;

    if (!tweetId || seenIds.has(tweetId)) {
      continue;
    }

    seenIds.add(tweetId);
    mergedTweets.push(tweet);
  }

  for (const tweet of incomingTweets) {
    const tweetId = tweet?._id;

    if (!tweetId || seenIds.has(tweetId)) {
      continue;
    }

    seenIds.add(tweetId);
    mergedTweets.push(tweet);
  }

  return mergedTweets;
}

/**
 * Alternates followed and non-followed user posts
 * Arranges posts in pattern: [followed, non-followed, followed, non-followed, ...]
 * @param {Array} tweets - Array of tweets with isUserFollowed property
 * @returns {Array} - Alternated tweets array
 */
export function alternateFollowedAndNonFollowed(tweets) {
  if (!Array.isArray(tweets) || tweets.length === 0) {
    return tweets;
  }

  const followed = tweets.filter((tweet) => tweet.isUserFollowed === true);
  const nonFollowed = tweets.filter((tweet) => tweet.isUserFollowed !== true);

  const alternated = [];
  const maxLength = Math.max(followed.length, nonFollowed.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < followed.length) {
      alternated.push(followed[i]);
    }
    if (i < nonFollowed.length) {
      alternated.push(nonFollowed[i]);
    }
  }

  return alternated;
}
