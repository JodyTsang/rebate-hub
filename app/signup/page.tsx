"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDemoAuth } from "@/src/hooks/useDemoAuth";
import { supabase } from "@/src/lib/supabaseClient";

// ✨ 开关：true = 使用 Supabase 注册；false = 使用原来的 demo 注册
const USE_SUPABASE_AUTH = true;

export default function SignupPage() {
  const router = useRouter();
  const { login } = useDemoAuth(); // 只在 demo 模式下会用

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!email.trim()) {
      setError("Please enter an email.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter a password.");
      return;
    }

    setLoading(true);

    try {
      if (USE_SUPABASE_AUTH) {
        // ✅ 使用 Supabase 真正注册
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          // 这里可以加 emailRedirectTo，不过简单起见先省略
        });

        if (signUpError) {
          setError(signUpError.message || "Sign up failed.");
          return;
        }

        // 注册成功后提示去邮箱确认
        setInfo("Sign up successful. Please check your email to confirm.");
      } else {
        // 🧪 demo 模式：直接当作注册并登录
        login(email);
        router.replace("/my-cashback");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Unexpected error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-[#111827]">
          Sign up
        </h1>
        <p className="text-xs text-[#6B7280]">
          Create a demo account to see how a cashback dashboard could look.
        </p>
        <p className="text-[11px] text-[#9CA3AF]">
          This is a demo implementation. No real accounts or payments are
          created.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1 text-xs">
          <label className="block text-[#4B5563]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 w-full rounded-md border border-zinc-300 px-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-1 text-xs">
          <label className="block text-[#4B5563]" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-9 w-full rounded-md border border-zinc-300 px-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </p>
        )}

        {info && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-9 w-full items-center justify-center rounded-full bg-orange-500 px-4 text-xs font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <p className="text-center text-[11px] text-[#6B7280]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Login
        </button>
      </p>
    </section>
  );
}

