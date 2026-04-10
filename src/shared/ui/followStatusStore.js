import { fetcher } from "../../../fetcher";

const statusCache = new Map();
const subscribers = new Map();
const inFlightFetches = new Map();

const notifySubscribers = (userId, value) => {
  const observers = subscribers.get(userId);
  if (!observers) return;
  observers.forEach((setter) => setter(value));
};

export const getFollowStatus = (userId) => statusCache.get(userId) ?? null;

export const subscribeFollowStatus = (userId, setter) => {
  if (!subscribers.has(userId)) {
    subscribers.set(userId, new Set());
  }
  subscribers.get(userId).add(setter);

  if (statusCache.has(userId)) {
    setter(statusCache.get(userId));
  }
};

export const unsubscribeFollowStatus = (userId, setter) => {
  const observers = subscribers.get(userId);
  if (!observers) return;
  observers.delete(setter);
  if (observers.size === 0) {
    subscribers.delete(userId);
  }
};

export const setFollowStatus = (userId, value) => {
  statusCache.set(userId, value);
  notifySubscribers(userId, value);
};

export const fetchFollowStatus = async (userId) => {
  if (statusCache.has(userId)) return statusCache.get(userId);

  if (inFlightFetches.has(userId)) {
    return inFlightFetches.get(userId);
  }

  const promise = fetcher(`/api/users/${userId}/follow-status`)
    .then((response) => {
      const value = response?.isFollowing ?? false;
      setFollowStatus(userId, value);
      inFlightFetches.delete(userId);
      return value;
    })
    .catch((err) => {
      inFlightFetches.delete(userId);
      throw err;
    });

  inFlightFetches.set(userId, promise);
  return promise;
};
