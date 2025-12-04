import Link from "next/link";
import { getMerchantById } from "@/src/lib/fatcoupon";

interface StoreDetailPageProps {
  params: {
    id: string;
  };
}

export default async function StoreDetailPage({ params }: StoreDetailPageProps) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
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

  const merchant = await getMerchantById(id);

  if (!merchant) {
    return (
      <section className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-red-700">
          Store not found
        </h1>
        <p className="text-sm text-[#4B5563]">
          We could not find this store in the FatCoupon catalog.
        </p>
      </section>
    );
  }

  const storeIdForRedirect = merchant.domain || merchant.name;

  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
            {merchant.name}
          </h1>
          {merchant.domain && (
            <p className="text-sm text-[#4B5563]">{merchant.domain}</p>
          )}
          {merchant.country && (
            <p className="mt-1 text-xs text-[#9CA3AF]">Country: {merchant.country}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {merchant.affCommissionRate && (
            <span className="text-sm font-medium text-orange-600">
              {merchant.affCommissionRate}
            </span>
          )}
          <Link
            href={`/go/${encodeURIComponent(storeIdForRedirect)}`}
            className="whitespace-nowrap rounded-full bg-orange-500 px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
          >
            Get Cashback
          </Link>
        </div>
      </div>

      {merchant.description && (
        <p className="text-sm text-[#4B5563]">{merchant.description}</p>
      )}
      {merchant.cashbackDesc && (
        <p className="text-xs text-[#6B7280]">{merchant.cashbackDesc}</p>
      )}

      <div className="pt-4 text-xs text-[#9CA3AF]">
        <p>Store data is provided by FatCoupon. Cashback rates are for reference only.</p>
      </div>
    </section>
  );
}
