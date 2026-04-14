export function updateTweetById(tweets, tweetId, changes) {
  return tweets.map((tweet) =>
    tweet._id === tweetId ? { ...tweet, ...changes } : tweet,
  );
}

export function removeTweetById(tweets, tweetId) {
  return tweets.filter((tweet) => tweet._id !== tweetId);
}
