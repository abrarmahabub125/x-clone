const API_ORIGIN = import.meta.env.VITE_API_BASE_URL
  ?.replace(/\/+$/, "")
  .replace(/\/api$/, "");

function normalizeApiPath(path) {
  return path.startsWith("/api")
    ? path
    : `/api${path.startsWith("/") ? path : `/${path}`}`;
}

export function getApiBaseUrl() {
  return API_ORIGIN ? `${API_ORIGIN}/api` : "/api";
}

export function getApiUrl(path) {
  const normalizedPath = normalizeApiPath(path);

  return API_ORIGIN ? `${API_ORIGIN}${normalizedPath}` : normalizedPath;
}
