function getApiUrl(path) {
  const normalizedPath = path.startsWith("/api")
    ? path
    : `/api${path.startsWith("/") ? path : `/${path}`}`;

  return normalizedPath;
}

export async function fetcher(path, options = {}) {
  const { body, headers, ...restOptions } = options;

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(getApiUrl(path), {
    credentials: "include",
    ...restOptions,
    body,
    headers: {
      ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(
      payload?.message || `Request failed with status ${response.status}.`,
    );
  }

  return payload;
}
