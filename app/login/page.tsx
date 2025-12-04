"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDemoAuth } from "@/src/hooks/useDemoAuth";
import { supabase } from "@/src/lib/supabaseClient";

// ✨ 开关：true = 使用 Supabase 登录；false = 使用原来的 demo 登录
const USE_SUPABASE_AUTH = true;

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useDemoAuth(); // 只在 demo 模式下会用到

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 已登录时自动跳转
  useEffect(() => {
    if (!USE_SUPABASE_AUTH) {
      // demo 模式：用 demo 的 isLoggedIn
      if (isLoggedIn) {
        router.replace("/my-cashback");
      }
      return;
    }

    // Supabase 模式：检查是否已有登录 session
    const checkSupabaseSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/my-cashback");
      }
    };

    checkSupabaseSession();
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
        // ✅ 使用 Supabase 真正登录
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // 可以根据需要定制错误提示
          if (signInError.message.toLowerCase().includes("email not confirmed")) {
            setError("Email not confirmed. Please check your inbox.");
          } else {
            setError(signInError.message || "Login failed.");
          }
          return;
        }

        router.replace("/my-cashback");
      } else {
        // 🧪 保留原来的 demo 登录逻辑
        login(email);
        router.replace("/my-cashback");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unexpected error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-[#111827]">
          Login
        </h1>
        <p className="text-xs text-[#6B7280]">
          Demo-only authentication so you can see how a cashback account page
          could look.
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

        <button
          type="submit"
          disabled={loading}
          className="flex h-9 w-full items-center justify-center rounded-full bg-orange-500 px-4 text-xs font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-[11px] text-[#6B7280]">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Sign up
        </button>
      </p>
    </section>
  );
}
