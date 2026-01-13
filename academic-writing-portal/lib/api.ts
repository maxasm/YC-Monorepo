type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = RequestInit & {
  authToken?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function request<T>(path: string, method: HttpMethod, body?: unknown, config: RequestConfig = {}) {
  const headers = new Headers(config.headers);

  if (body !== undefined && !(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (config.authToken) {
    headers.set("Authorization", `Bearer ${config.authToken}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    body: body instanceof FormData ? (body as BodyInit) : body ? JSON.stringify(body) : undefined,
    headers,
    credentials: "include",
    cache: "no-store",
    ...config,
    next: { revalidate: 0, ...(config.next ?? {}) },
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorMessage = (payload as { message?: string })?.message ?? response.statusText;
    throw new Error(errorMessage || "Request failed");
  }

  return payload as T;
}

export const api = {
  get: <T>(path: string, config?: RequestConfig) => request<T>(path, "GET", undefined, config),
  post: <T>(path: string, body?: unknown, config?: RequestConfig) => request<T>(path, "POST", body, config),
  put: <T>(path: string, body?: unknown, config?: RequestConfig) => request<T>(path, "PUT", body, config),
  patch: <T>(path: string, body?: unknown, config?: RequestConfig) => request<T>(path, "PATCH", body, config),
  delete: <T>(path: string, config?: RequestConfig) => request<T>(path, "DELETE", undefined, config),
};
