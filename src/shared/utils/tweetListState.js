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
