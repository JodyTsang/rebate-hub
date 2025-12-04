import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMerchantById } from "@/src/lib/fatcoupon";

interface StoreDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StoreDetailPage({ params }: StoreDetailPageProps) {
  const resolvedParams = await params;
  console.log("[StoreDetail] Raw params", resolvedParams);
  const numericId = Number(resolvedParams.id);
  console.log("[StoreDetail] Parsed numericId", numericId);

  if (!Number.isFinite(numericId)) {
    console.error("[StoreDetail] Invalid numericId from params.id", {
      raw: resolvedParams.id,
      numericId,
    });
    return (
      <section className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-red-700">
          Invalid store
        </h1>
        <p className="text-sm text-[#4B5563]">
          The store identifier is not valid.
        </p>
      </section>
    );
  }

  console.log("[StoreDetail] Fetching merchant by id", numericId);
  const merchant = await getMerchantById(numericId);

  if (!merchant) {
    console.error("[StoreDetail] No merchant returned for id", numericId);
    notFound();
  }

  const storeIdForRedirect = merchant.domain || merchant.name;
  const officialUrl = merchant.domain
    ? merchant.domain.startsWith("http")
      ? merchant.domain
      : `https://${merchant.domain}`
    : null;

  const cashbackInfo = merchant.affCommissionRate || merchant.cashbackDesc;
  const lastUpdated = merchant.updatedAt || merchant.createdAt;
  const websiteLabel =
    (Array.isArray((merchant as any).urls) && (merchant as any).urls[0]?.domain) ||
    merchant.domain;
  const regionLabel = (merchant as any).geo || merchant.country;

  return (
    <section className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 text-lg font-medium text-gray-500">
            {merchant.image ? (
              <Image
                src={merchant.image}
                alt={merchant.name}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            ) : (
              merchant.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
              {merchant.name}
            </h1>
            {merchant.domain && (
              <p className="text-sm text-[#4B5563]">{merchant.domain}</p>
            )}
            {regionLabel && (
              <p className="mt-1 text-xs text-[#9CA3AF]">Region: {regionLabel}</p>
            )}
            {merchant.cashbackDesc && (
              <p className="mt-3 text-xs text-[#6B7280]">
                {merchant.cashbackDesc}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {merchant.affCommissionRate && (
            <span className="text-sm font-medium text-orange-600">
              {merchant.affCommissionRate}
            </span>
          )}
          <Link
            href={`/go/${encodeURIComponent(storeIdForRedirect)}`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-5 py-2 text-xs font-medium text-white transition hover:opacity-90"
          >
            Get Cashback
          </Link>
          {officialUrl && (
            <a
              href={officialUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-[#4B5563] underline underline-offset-2 hover:text-[#111827]"
            >
              Go to official site
            </a>
          )}
        </div>
      </div>

      {/* Description section */}
      {merchant.description && (
        <div>
          <h2 className="mb-2 text-sm font-semibold text-[#111827]">
            About {merchant.name}
          </h2>
          <p className="text-sm text-[#4B5563]">{merchant.description}</p>
        </div>
      )}

      {/* Info / meta section */}
      <div className="grid gap-4 border-t border-zinc-100 pt-4 text-xs text-[#6B7280] sm:grid-cols-2">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
            Store info
          </h3>
          <dl className="space-y-1">
            {websiteLabel && (
              <div className="flex gap-2">
                <dt className="w-24 text-[#9CA3AF]">Website</dt>
                <dd className="flex-1 break-all text-[#4B5563]">
                  {websiteLabel}
                </dd>
              </div>
            )}
            {merchant.country && (
              <div className="flex gap-2">
                <dt className="w-24 text-[#9CA3AF]">Country</dt>
                <dd className="flex-1 text-[#4B5563]">{merchant.country}</dd>
              </div>
            )}
            {cashbackInfo && (
              <div className="flex gap-2">
                <dt className="w-24 text-[#9CA3AF]">Cashback</dt>
                <dd className="flex-1 text-[#4B5563]">{cashbackInfo}</dd>
              </div>
            )}
            {lastUpdated && (
              <div className="flex gap-2">
                <dt className="w-24 text-[#9CA3AF]">Last updated</dt>
                <dd className="flex-1 text-[#4B5563]">{lastUpdated}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
            Highlights
          </h3>
          <div className="flex flex-wrap gap-2">
            {/* 没有真实标签字段时，我们仅在有现金返利时展示一个简单的高亮徽章 */}
            {cashbackInfo && (
              <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-medium text-orange-700">
                Cashback available
              </span>
            )}
            {merchant.cashbackType && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-[#4B5563]">
                Type: {merchant.cashbackType.toUpperCase()}
              </span>
            )}
            {(merchant as any).extensionallowed && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                Extension supported
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#9CA3AF]">
            Categories and tags are based on RebateHub&apos;s own grouping. You can
            feature this store in sections like fashion, travel, or beauty on the
            homepage.
          </p>
        </div>
      </div>

      {/* Coupon list section */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-[#111827]">Coupons</h2>
        <div className="space-y-3">
          {/* FatCoupon public docs for per-store coupons are not available in this project yet.
              For now we show a friendly empty state instead of faking endpoints. */}
          <p className="text-sm text-[#6B7280]">
            Coupons for this store are not available via the current FatCoupon API
            integration yet. You can still click "Get Cashback" above to earn
            cashback on your purchase.
          </p>
        </div>
      </div>

      <div className="pt-2 text-[11px] text-[#9CA3AF]">
        Store data is provided by FatCoupon. Cashback rates are for reference
        only.
      </div>
    </section>
  );
}
