"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabaseClient";

type CashbackRecord = {
  id: string;
  user_id: string;
  merchant_name: string;
  order_amount: number | null;
  cashback_amount: number | null;
  currency: string | null;
  status: string | null; // e.g. "pending", "confirmed", "paid", "cancelled"
  order_date: string | null;
  created_at: string;
};

export default function MyCashbackPage() {
  const router = useRouter();

  const [records, setRecords] = useState<CashbackRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      // 1) 获取当前用户
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        if (!cancelled) {
          router.replace("/login");
        }
        return;
      }

      if (!cancelled) {
        setUserEmail(userData.user.email ?? null);
      }

      // 2) 查询该用户的 cashback_records
      const { data, error: recordsError } = await supabase
        .from("cashback_records")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (cancelled) return;

      if (recordsError) {
        setError("Failed to load cashback records.");
        setRecords([]);
      } else {
        setRecords((data as CashbackRecord[]) ?? []);
      }

      setLoading(false);
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // ---------- 汇总金额计算（保持现有逻辑） ----------

  const formatMoney = (value: number) => {
    const safe = isNaN(value) ? 0 : value;
    return `$${safe.toFixed(2)}`;
  };

  const pendingAmount = records.reduce((sum, r) => {
    if (r.status === "pending") {
      const v = Number(r.cashback_amount ?? 0);
      return sum + (isNaN(v) ? 0 : v);
    }
    return sum;
  }, 0);

  const confirmedAmount = records.reduce((sum, r) => {
    if (r.status === "confirmed") {
      const v = Number(r.cashback_amount ?? 0);
      return sum + (isNaN(v) ? 0 : v);
    }
    return sum;
  }, 0);

  const availableForPayout = confirmedAmount;

  const lifetimeAmount = records.reduce((sum, r) => {
    if (r.status === "cancelled") return sum;
    const v = Number(r.cashback_amount ?? 0);
    return sum + (isNaN(v) ? 0 : v);
  }, 0);

  const isAllZero =
    pendingAmount === 0 && confirmedAmount === 0 && lifetimeAmount === 0;

  const renderStatusBadge = (status: string | null) => {
    const normalized = (status || "pending").toLowerCase();

    let className =
      "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ";
    if (normalized === "confirmed") {
      className += "bg-emerald-50 text-emerald-700";
    } else if (normalized === "paid" || normalized === "paid_out") {
      className += "bg-orange-50 text-orange-700";
    } else if (normalized === "cancelled" || normalized === "rejected") {
      className += "bg-red-50 text-red-700";
    } else {
      className += "bg-zinc-100 text-zinc-700";
    }

    return <span className={className}>{status || "pending"}</span>;
  };

  // ---------- 渲染 ----------

  return (
    <section className="space-y-6">
      {/* A. 顶部账户摘要卡片 */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-zinc-900">
              My Cashback
            </h1>
            <p className="max-w-xl text-xs text-zinc-500">
              A summary of your RebateHub cashback history and current payout
              status.
            </p>
            <p className="max-w-xl text-[11px] text-zinc-400">
              Payouts are currently processed manually. Contact our team when
              you want to withdraw your confirmed cashback.
            </p>
          </div>
          {userEmail && (
            <div className="flex flex-col items-end text-right text-[11px] text-zinc-500">
              <span className="font-medium text-zinc-900">
                Hi, {userEmail}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* B. 汇总卡片 */}
      <div className="space-y-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <section className="space-y-1 rounded-2xl border border-zinc-200 bg-white p-4 text-xs text-zinc-600 shadow-sm sm:p-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              Pending cashback
            </h2>
            <p className="text-lg font-semibold text-amber-500 sm:text-xl">
              {formatMoney(pendingAmount)}
            </p>
            <p className="text-[11px] leading-snug text-zinc-500">
              Orders that are tracked but still within the return window.
            </p>
          </section>

          <section className="space-y-1 rounded-2xl border border-zinc-200 bg-white p-4 text-xs text-zinc-600 shadow-sm sm:p-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              Confirmed cashback
            </h2>
            <p className="text-lg font-semibold text-emerald-600 sm:text-xl">
              {formatMoney(confirmedAmount)}
            </p>
            <p className="text-[11px] leading-snug text-zinc-500">
              Cashback that has been approved by stores and can be prepared for
              payout.
            </p>
          </section>

          <section className="space-y-1 rounded-2xl border border-zinc-200 bg-white p-4 text-xs text-zinc-600 shadow-sm sm:p-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              Available for payout
            </h2>
            <p className="text-lg font-semibold text-sky-600 sm:text-xl">
              {formatMoney(availableForPayout)}
            </p>
            <p className="text-[11px] leading-snug text-zinc-500">
              This amount can be withdrawn. Contact us to arrange a payout.
            </p>
          </section>

          <section className="space-y-1 rounded-2xl border border-zinc-200 bg-white p-4 text-xs text-zinc-600 shadow-sm sm:p-5">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              Lifetime cashback
            </h2>
            <p className="text-lg font-semibold text-indigo-600 sm:text-xl">
              {formatMoney(lifetimeAmount)}
            </p>
            <p className="text-[11px] leading-snug text-zinc-500">
              Total cashback you have earned since joining RebateHub.
            </p>
          </section>
        </div>

        {isAllZero && !loading && !error && (
          <p className="text-[11px] text-zinc-400">
            You do not have any cashback yet. Once you start shopping through
            RebateHub, your tracked orders will appear here.
          </p>
        )}
      </div>

      {/* C. Payout & withdrawals 卡片 */}
      <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 text-xs text-zinc-600 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-zinc-900">
            Payout & withdrawals
          </h2>
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-600">
            Next payout threshold: $20.00
          </span>
        </div>

        {availableForPayout >= 20 ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-800">
              You&apos;re eligible to request a payout.
            </p>
            <p className="text-[11px] leading-snug text-zinc-600">
              Your confirmed cashback has reached the suggested payout
              threshold. Contact our team and we&apos;ll arrange a payout via
              your preferred method.
            </p>
            <button
              type="button"
              onClick={() => {
                // TODO: open contact page or mailto
              }}
              className="mt-3 inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-[11px] font-medium text-white hover:opacity-90"
            >
              Contact us to request payout
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-zinc-800">
                You haven&apos;t reached the payout threshold yet.
              </p>
              <p className="text-[11px] leading-snug text-zinc-600">
                Once your confirmed cashback reaches the suggested threshold,
                you&apos;ll be able to request a payout.
              </p>
            </div>
            <div className="mt-1">
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (availableForPayout / 20) * 100
                    ).toFixed(0)}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-[11px] text-zinc-500">
                {formatMoney(availableForPayout)} of $20.00 confirmed cashback
              </p>
            </div>
          </div>
        )}
      </section>

      {/* D. Recent activity 表格 */}
      <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 text-xs text-zinc-600 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900">
            Recent activity
          </h2>
          <span className="text-[11px] text-zinc-500">
            Last {records.length} tracked orders
          </span>
        </div>

        {loading && (
          <p className="py-4 text-center text-[11px] text-zinc-500">
            Loading your cashback dashboard...
          </p>
        )}

        {!loading && error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
            Failed to load cashback records. Please refresh the page or try
            again later.
          </p>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-8 text-center text-[11px] text-zinc-500">
            <p className="font-medium text-zinc-700">
              No cashback records yet.
            </p>
            <p className="mt-1 max-w-md">
              Once you start shopping through RebateHub and your orders track
              successfully, they&apos;ll appear here.
            </p>
          </div>
        )}

        {!loading && records.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-1 text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-2 py-1 font-medium">Date</th>
                  <th className="px-2 py-1 font-medium">Store</th>
                  <th className="px-2 py-1 font-medium">Order amount</th>
                  <th className="px-2 py-1 font-medium">Cashback</th>
                  <th className="px-2 py-1 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row) => {
                  const date = (row.created_at || "").slice(0, 10);
                  const orderValue = row.order_amount ?? null;
                  const cashbackValue = row.cashback_amount ?? null;
                  const orderText =
                    orderValue === null
                      ? "-"
                      : `$${Number(orderValue || 0).toFixed(2)}`;
                  const cashbackText =
                    cashbackValue === null
                      ? "-"
                      : `$${Number(cashbackValue || 0).toFixed(2)}`;

                  return (
                    <tr key={row.id} className="rounded-lg">
                      <td className="rounded-l-lg bg-zinc-50 px-2 py-2 text-zinc-700">
                        {date || "-"}
                      </td>
                      <td className="bg-zinc-50 px-2 py-2 text-zinc-700">
                        {row.merchant_name}
                      </td>
                      <td className="bg-zinc-50 px-2 py-2 text-zinc-700">
                        {orderText}
                      </td>
                      <td className="bg-zinc-50 px-2 py-2 text-zinc-700">
                        {cashbackText}
                      </td>
                      <td className="rounded-r-lg bg-zinc-50 px-2 py-2">
                        {renderStatusBadge(row.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* E. How cashback tracking works */}
      <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 text-xs text-zinc-600 shadow-sm sm:p-6">
        <h2 className="text-sm font-semibold text-zinc-900">
          How cashback tracking works
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Always start your shopping journey by clicking &quot;Get
            Cashback&quot; on RebateHub.
          </li>
          <li>
            Avoid using other coupon or cashback extensions at the same time.
          </li>
          <li>Most orders appear as pending within 1–2 days after purchase.</li>
          <li>
            After the store&apos;s return period ends, eligible orders move to
            Confirmed. When your confirmed cashback is ready, contact our team
            to arrange a payout.
          </li>
        </ul>
      </section>
    </section>
  );
}