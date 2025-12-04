export type DemoUser = {
  name: string;
  email: string;
  password: string;
};

const USER_KEY = "rebatehub_demo_user";
const LOGGED_IN_KEY = "rebatehub_demo_logged_in";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getStoredUser(): DemoUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function saveUser(user: DemoUser) {
  if (!isBrowser()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): DemoUser | null {
  if (!isBrowser()) return null;
  const loggedIn = localStorage.getItem(LOGGED_IN_KEY) === "true";
  if (!loggedIn) return null;
  return getStoredUser();
}

export function signup(name: string, email: string, password: string): {
  ok: boolean;
  error?: string;
} {
  if (!isBrowser()) {
    return { ok: false, error: "Not available on server" };
  }

  if (!name.trim() || !email.trim() || !password.trim()) {
    return { ok: false, error: "All fields are required." };
  }

  const user: DemoUser = { name: name.trim(), email: email.trim(), password };
  saveUser(user);
  localStorage.setItem(LOGGED_IN_KEY, "true");
  return { ok: true };
}

export function login(email: string, password: string): {
  ok: boolean;
  error?: string;
} {
  if (!isBrowser()) {
    return { ok: false, error: "Not available on server" };
  }

  const stored = getStoredUser();
  if (!stored) {
    return { ok: false, error: "No account found. Please sign up first." };
  }

  if (stored.email !== email.trim() || stored.password !== password) {
    return { ok: false, error: "Invalid email or password." };
  }

  localStorage.setItem(LOGGED_IN_KEY, "true");
  return { ok: true };
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.setItem(LOGGED_IN_KEY, "false");
}
