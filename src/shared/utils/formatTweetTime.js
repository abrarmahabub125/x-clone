export function formatTweetTime(dateString) {
  const date = new Date(dateString);

  // ❗ invalid date guard
  if (isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 🔥 Seconds
  if (seconds < 60) {
    return `${seconds}s`;
  }

  // 🔥 Minutes
  if (minutes < 60) {
    return `${minutes}m`;
  }

  // 🔥 Hours
  if (hours < 24) {
    return `${hours}h`;
  }

  // 🔥 Yesterday
  if (days === 1) {
    return "Yesterday";
  }

  const isSameYear = now.getFullYear() === date.getFullYear();

  const optionsSameYear = {
    month: "short",
    day: "numeric",
  };

  const optionsWithYear = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return new Intl.DateTimeFormat(
    "en-US",
    isSameYear ? optionsSameYear : optionsWithYear,
  ).format(date);
}
