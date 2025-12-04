"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

type NavUser = {
  email: string | null;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function cls(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<NavUser | null>(null);
  const [checking, setChecking] = useState(true);

  // 使用 Supabase 真实登录状态（逻辑保持不变）
  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const { data } = await supabase.auth.getUser();
        if (!isMounted) return;
        setUser(data.user ?? null);
      } finally {
        if (isMounted) setChecking(false);
      }
    }

    loadUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        setUser(session?.user ?? null);
      }
    );

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // 登录后多一个 My Cashback（逻辑不变）
  const visibleNavItems = isLoggedIn
    ? [...navItems, { href: "/my-cashback", label: "My Cashback" }]
    : navItems;

  return (
    // 外层不再设置背景色，由 layout 的 header 统一提供 #FF7A1A
    <div className="flex h-16 items-center justify-between gap-8">
      {/* 左上角品牌：双色 Rebate / Hub */}
      <Link
        href="/"
        className="flex items-center gap-1 select-none group"
      >
        <span className="text-white text-[22px] font-semibold tracking-wide leading-none group-hover:opacity-90 transition-opacity">
          Rebate
        </span>
        <span className="text-[#FFF4E0] text-[22px] font-light tracking-wide leading-none group-hover:text-white transition-colors">
          Hub
        </span>
      </Link>

      {/* 中间导航：等宽分布，等高对齐 */}
      <nav className="hidden h-full flex-1 items-center justify-between text-sm font-medium md:flex">
        {visibleNavItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cls(
                // 保留原有布局，只增强文字和 hover 效果
                "inline-flex h-full items-center rounded-md px-3 py-1 text-[15px] transition-colors transition-opacity",
                active
                  ? // 选中：保留橙色背景，文字加粗且保持白色
                    "bg-[#E86400] text-white font-semibold hover:opacity-90"
                  : // 默认：白色半透明，hover 轻微透明变化
                    "text-white font-semibold hover:opacity-90"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 右侧登录区域：适配橙色背景 */}
      <div className="flex h-full items-center gap-2 text-xs md:gap-3 md:text-sm">
        {isLoggedIn && user ? (
          <>
            <span className="hidden max-w-[200px] truncate text-white/90 md:inline-flex h-full items-center">
              Hi,{" "}
              <span className="ml-1 font-medium text-white">
                {user.email}
              </span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-8 items-center rounded-md border border-white/70 bg-transparent px-3 text-[13px] font-medium text-white shadow-sm transition hover:bg-white/20"
            >
              Logout
            </button>
          </>
        ) : checking ? (
          <span className="w-[120px]" />
        ) : (
          <>
            <Link
              href="/login"
              className="inline-flex h-8 items-center rounded-md border border-white/70 bg-transparent px-3 text-[13px] font-medium text-white shadow-sm transition hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-8 items-center rounded-md bg-white px-3 text-[13px] font-semibold text-[#FF7A1A] shadow-sm transition hover:bg-white/90"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}