import Image from "next/image";
import Link from "next/link";
import { CATEGORIES_CONFIG } from "@/src/config/categories";
import { getMerchants, type Merchant } from "@/src/lib/fatcoupon";

function getCleanHost(domain?: string | null): string | null {
  if (!domain) return null;
  let value = domain.trim();
  if (!value) return null;

  // Ensure we have a protocol so URL parsing works
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }

  try {
    const url = new URL(value);
    const host = url.host.replace(/^www\./i, "");
    return host || null;
  } catch {
    return null;
  }
}

function categorizeMerchants(merchants: Merchant[]) {
  const buckets: Record<string, Merchant[]> = {
    fashion: [],
    electronics: [],
    travel: [],
    beauty: [],
    others: [],
  };

  const knownSlugs = new Set(Object.keys(buckets));

  for (const merchant of merchants) {
    const cats =
      merchant.categories && merchant.categories.length > 0
        ? merchant.categories
        : ["Others"];

    for (const rawCat of cats) {
      const lower = rawCat.toLowerCase();
      const slug = knownSlugs.has(lower) ? lower : "others";
      buckets[slug].push(merchant);
    }
  }

  // Remove duplicates per bucket (same merchant might be pushed twice)
  for (const slug of Object.keys(buckets)) {
    const seen = new Set<number>();
    buckets[slug] = buckets[slug].filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
  }

  return buckets;
}

export default async function CategoriesPage() {
  // Load a large batch of merchants once, similar to category mode on Home.
  const { items } = await getMerchants({ page: 1, size: 1000 });
  const buckets = categorizeMerchants(items);

  const totalStores = items.length;
  const mainCategoryCount = 4; // fashion, electronics, travel, beauty

  return (
    <section className="space-y-8">
      {/* Hero section */}
      <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
          Browse stores by category
        </h1>
        <p className="text-sm text-[#4B5563]">
          Discover cashback offers across fashion, electronics, travel, beauty,
          and more.
        </p>
        <p className="text-xs text-[#6B7280]">
          {totalStores}+ stores · {mainCategoryCount} main categories · Data
          provided by FatCoupon
        </p>
      </div>

      {/* Categories grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {CATEGORIES_CONFIG.map((cat) => {
          const bucket = buckets[cat.slug] ?? [];
          const featured = [...bucket]
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 8);

          return (
            <div
              key={cat.slug}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-[#111827]">
                    {cat.label}
                  </h2>
                  <p className="text-xs text-[#6B7280]">{cat.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#4B5563]">
                    Top stores in this category
                  </p>
                  {featured.length === 0 ? (
                    <p className="text-xs text-[#9CA3AF]">
                      No stores have been assigned to this category yet.
                    </p>
                  ) : (
                    <ul className="space-y-2 text-xs text-[#4B5563]">
                      {featured.map((store) => {
                        const host = getCleanHost(store.domain);
                        const initial = store.name.charAt(0).toUpperCase();

                        return (
                          <li
                            key={store.id}
                            className="flex items-center justify-between gap-3"
                          >
                            {/* Left: logo / initial + name + domain */}
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-[11px] font-medium text-[#6B7280]">
                                {store.image ? (
                                  <Image
                                    src={store.image}
                                    alt={store.name}
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-contain"
                                  />
                                ) : (
                                  initial
                                )}
                              </div>
                              <div className="flex min-w-0 flex-col">
                                <Link
                                  href={`/store/${store.id}`}
                                  className="truncate text-xs font-medium text-[#111827] hover:text-orange-600"
                                >
                                  {store.name}
                                </Link>
                                {host && (
                                  <span className="truncate text-[11px] text-[#9CA3AF]">
                                    {host}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Right: cashback pill */}
                            {store.affCommissionRate && (
                              <span className="shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-medium text-white">
                                {store.affCommissionRate}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end text-xs text-[#6B7280]">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="rounded-full border border-zinc-200 px-3 py-1 font-medium text-[#4B5563] transition hover:bg-zinc-50"
                >
                  View all {cat.label} stores
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Guides section */}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Category Guides
          </h2>
          <p className="text-xs text-[#6B7280]">
            Learn how to get the most out of each category when you combine
            cashback with coupons and smart timing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4">
            <h3 className="text-sm font-semibold text-[#111827]">
              Fashion Guide
            </h3>
            <p className="text-xs text-[#4B5563]">
              Save on clothing, shoes, accessories, and designer labels. Stack
              cashback with seasonal promotions, coupon codes, and loyalty
              points to maximize savings when shopping fashion brands.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4">
            <h3 className="text-sm font-semibold text-[#111827]">
              Electronics Guide
            </h3>
            <p className="text-xs text-[#4B5563]">
              Compare cashback rates on gadgets, tech devices, home appliances,
              and accessories. Brands like Dyson, Anker, Lenovo, and more
              frequently offer promotional cashback during major sale periods.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4">
            <h3 className="text-sm font-semibold text-[#111827]">
              Travel Guide
            </h3>
            <p className="text-xs text-[#4B5563]">
              Find cashback offers for hotels, flights, car rentals, and travel
              services. Perfect for planning vacations or business trips while
              lowering your total travel costs.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4">
            <h3 className="text-sm font-semibold text-[#111827]">
              Beauty Guide
            </h3>
            <p className="text-xs text-[#4B5563]">
              Discover cashback on skincare, makeup, fragrance, and beauty
              essentials. Many beauty merchants offer higher cashback during
              seasonal events like Black Friday or holiday gift seasons.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#6B7280]">
            Answers to common questions about how categories and cashback work
            on RebateHub.
          </p>
        </div>

        <div className="space-y-2">
          <details className="group rounded-xl border border-zinc-200 bg-[#F9FAFB] p-3 text-xs text-[#4B5563]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[#111827]">
              <span className="font-medium">How are categories decided?</span>
              <span className="text-[11px] text-[#9CA3AF] group-open:hidden">
                +
              </span>
              <span className="hidden text-[11px] text-[#9CA3AF] group-open:inline">
                −
              </span>
            </summary>
            <div className="mt-2 text-[11px] text-[#4B5563]">
              Categories are grouped based on store industry types and
              RebateHub&apos;s internal classification system.
            </div>
          </details>

          <details className="group rounded-xl border border-zinc-200 bg-[#F9FAFB] p-3 text-xs text-[#4B5563]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[#111827]">
              <span className="font-medium">
                Do cashback rates vary by category?
              </span>
              <span className="text-[11px] text-[#9CA3AF] group-open:hidden">
                +
              </span>
              <span className="hidden text-[11px] text-[#9CA3AF] group-open:inline">
                −
              </span>
            </summary>
            <div className="mt-2 text-[11px] text-[#4B5563]">
              Yes. Categories like Fashion and Beauty often have higher rates,
              while Electronics tend to have lower rates.
            </div>
          </details>

          <details className="group rounded-xl border border-zinc-200 bg-[#F9FAFB] p-3 text-xs text-[#4B5563]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[#111827]">
              <span className="font-medium">
                Why do some categories show fewer stores?
              </span>
              <span className="text-[11px] text-[#9CA3AF] group-open:hidden">
                +
              </span>
              <span className="hidden text-[11px] text-[#9CA3AF] group-open:inline">
                −
              </span>
            </summary>
            <div className="mt-2 text-[11px] text-[#4B5563]">
              It depends on the merchants supported by FatCoupon&apos;s
              affiliate network.
            </div>
          </details>

          <details className="group rounded-xl border border-zinc-200 bg-[#F9FAFB] p-3 text-xs text-[#4B5563]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[#111827]">
              <span className="font-medium">
                Can a store appear in multiple categories?
              </span>
              <span className="text-[11px] text-[#9CA3AF] group-open:hidden">
                +
              </span>
              <span className="hidden text-[11px] text-[#9CA3AF] group-open:inline">
                −
              </span>
            </summary>
            <div className="mt-2 text-[11px] text-[#4B5563]">
              Yes. Some merchants operate across multiple industries and may fit
              into more than one category.
            </div>
          </details>
        </div>
      </section>

      {/* Footer note */}
      <div className="space-y-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-xs text-[#6B7280]">
        <p>
          Categories are based on RebateHub&apos;s own grouping. Cashback rates
          and availability may change and are provided by FatCoupon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-[11px] font-medium text-orange-600 hover:text-orange-700"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
