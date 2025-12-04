"use client";

import { useEffect, useState } from "react";

export type DemoAuthUser = {
  email: string;
};

const AUTH_EMAIL_KEY = "rebatehub_demo_auth_email";
const AUTH_LOGGED_IN_KEY = "rebatehub_demo_auth_logged_in";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function useDemoAuth() {
  const [user, setUser] = useState<DemoAuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isBrowser()) return;
    const loggedIn = localStorage.getItem(AUTH_LOGGED_IN_KEY) === "true";
    const email = localStorage.getItem(AUTH_EMAIL_KEY);
    if (loggedIn && email) {
      setIsLoggedIn(true);
      setUser({ email });
    }
  }, []);

  const login = (email: string) => {
    if (!isBrowser()) return;
    const cleanEmail = email.trim();
    localStorage.setItem(AUTH_EMAIL_KEY, cleanEmail);
    localStorage.setItem(AUTH_LOGGED_IN_KEY, "true");
    setIsLoggedIn(true);
    setUser({ email: cleanEmail });
  };

  const logout = () => {
    if (!isBrowser()) return;
    localStorage.setItem(AUTH_LOGGED_IN_KEY, "false");
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, login, logout };
}
