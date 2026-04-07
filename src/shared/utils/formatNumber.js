export function formatNumber(num) {
  if (num == null || isNaN(num)) return "0";

  const abs = Math.abs(num);

  // 🔥 1 - 999
  if (abs < 1000) {
    return String(num);
  }

  // 🔥 1K - 999K
  if (abs < 999500) {
    const value = num / 1000;
    return Number.isInteger(value) ? `${value}K` : `${value.toFixed(1)}K`;
  }

  // 🔥 1M - 999M
  if (abs < 999500000) {
    const value = num / 1_000_000;
    return Number.isInteger(value) ? `${value}M` : `${value.toFixed(1)}M`;
  }

  // 🔥 1B+
  const value = num / 1_000_000_000;
  return Number.isInteger(value) ? `${value}B` : `${value.toFixed(1)}B`;
}
