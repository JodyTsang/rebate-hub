// src/auth.ts
import { supabase } from "./supabaseClient";

// 获取当前用户（用于 Server Components）
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }

  return data.user;
}

// 用户注册
export async function signup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("signup error:", error);
    throw error;
  }

  return data.user;
}

// 用户登录
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("login error:", error);
    throw error;
  }

  return data.user;
}

// 用户登出
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("logout error:", error);
    throw error;
  }

  return true;
}
