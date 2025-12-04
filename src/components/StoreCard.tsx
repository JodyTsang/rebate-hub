import Link from "next/link";

export interface StoreCardProps {
  name: string;
  domain?: string;
  logoUrl?: string;
  cashbackText?: string;
  storeId?: string;
  merchantId?: number;
}

export function StoreCard({
  name,
  domain,
  logoUrl,
  cashbackText,
  storeId,
  merchantId,
}: StoreCardProps) {
  const targetId = storeId ?? domain ?? name;

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-sm font-medium text-gray-500">
          {logoUrl ? (
            // 使用原生 img 避免 next/image 域名白名单限制
            <img
              src={logoUrl}
              alt={name}
              className="h-12 w-12 object-contain"
            />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{name}</span>
          {domain && (
            <span className="text-xs text-gray-500">{domain}</span>
          )}
          {cashbackText && (
            <span className="mt-1 text-xs font-medium text-orange-600">
              {cashbackText}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {merchantId !== undefined && (
          <Link
            href={`/store/${merchantId}`}
            className="whitespace-nowrap rounded-full border border-zinc-200 px-3 py-2 text-xs font-medium text-[#4B5563] transition hover:bg-zinc-50"
          >
            View details
          </Link>
        )}
        <Link
          href={`/go/${encodeURIComponent(targetId)}`}
          className="whitespace-nowrap rounded-full bg-orange-500 px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
        >
          Get Cashback
        </Link>
      </div>
    </div>
  );
}
