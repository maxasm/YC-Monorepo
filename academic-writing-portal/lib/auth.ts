import { cookies } from "next/headers";
import { api } from "./api";
import { Role, User } from "@/types";

const AUTH_COOKIE = "auth_token";

export function getAuthToken() {
  const store = cookies();
  return store.get(AUTH_COOKIE)?.value;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    return await api.get<User>('/api/auth/me', { authToken: token });
  } catch (error) {
    console.error("Failed to load current user", error);
    return null;
  }
}

export function hasRole(user: User | null, allowed: Role[]) {
  if (!user) return false;
  return allowed.includes(user.role);
}
