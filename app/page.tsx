import Link from "next/link";
import { StoreCard } from "@/src/components/StoreCard";
import { FaqAccordion } from "@/src/components/FaqAccordion";
import { getMerchants } from "@/src/lib/fatcoupon";

const PAGE_SIZE = 60;

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fashion", label: "Fashion" },
  { id: "electronics", label: "Electronics" },
  { id: "travel", label: "Travel" },
  { id: "beauty", label: "Beauty" },
];

function matchesCategory(categories: string[] | undefined, categoryId?: string) {
  if (!categoryId || categoryId === "all") return true;
  if (!categories || categories.length === 0) return false;

  const target = categoryId.toLowerCase();
  return categories.some((cat) => cat.toLowerCase() === target);
}

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const currentPage =
    params.page && Number.isFinite(Number(params.page))
      ? Math.max(1, Number(params.page))
      : 1;

  const query = params.q?.trim() || "";
  const categoryId = params.category || "all";
  const isAllMode = categoryId === "all";

  // In "All" mode we keep existing paginated behavior.
  // In category mode we ignore remote pagination and load a large page once.
  const { items, page, size, total, error } = await getMerchants({
    page: isAllMode ? currentPage : 1,
    size: isAllMode ? PAGE_SIZE : 1000,
    search: isAllMode ? (query || undefined) : undefined,
  });

  const normalizedQuery = query.toLowerCase();

  // First, apply category filter (if any) on the full list from API.
  const categoryFilteredItems = items.filter((item) =>
    matchesCategory(item.categories, categoryId)
  );

  // Then apply search within that result set.
  const searchedItems = normalizedQuery
    ? categoryFilteredItems.filter((item) => {
        const haystack = `${item.name} ${item.domain ?? ""} ${
          item.description ?? ""
        }`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : categoryFilteredItems;

  // In category mode, we only show up to 15 merchants and do not paginate.
  const filteredItems = isAllMode
    ? searchedItems
    : searchedItems.slice(0, 15);

  const hasPrev = isAllMode && page > 1;
  const hasNext = isAllMode && page * size < total;

  const buildHref = (overrides: {
    page?: number;
    q?: string;
    category?: string;
  }) => {
    const params = new URLSearchParams();
    const nextPage = overrides.page ?? page;
    const nextQuery =
      overrides.q !== undefined ? overrides.q : query;
    const nextCategory =
      overrides.category !== undefined ? overrides.category : categoryId;

    if (nextPage && nextPage !== 1) params.set("page", String(nextPage));
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory && nextCategory !== "all")
      params.set("category", nextCategory);

    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  const faqItems = [
    {
      question: "What is RebateHub?",
      answer:
        'RebateHub is a cashback site that helps you save money when you shop online. You browse stores on RebateHub, click "Get Cashback", complete your purchase on the merchant\'s website, and we track eligible orders so you can earn cashback.',
    },
    {
      question: "How does cashback work?",
      answer:
        'When you click a "Get Cashback" link on RebateHub, we redirect you to the merchant with a special tracking link. If you complete a qualifying purchase, the merchant reports the transaction to our partner network and we receive a commission. We then share part of that commission with you as cashback.',
    },
    {
      question: "Do I need an account to earn cashback?",
      answer:
        "In the future, you will be able to create an account to view and manage your cashback. For now, this demo focuses on exploring stores and cashback rates. Account-based tracking and payout features will be added later.",
    },
    {
      question: "When will my cashback appear?",
      answer:
        "In a full production version, cashback usually appears as \"pending\" within a few hours to a few days after your purchase is tracked, and becomes \"payable\" once the return period ends and the merchant confirms the order. Timelines vary by store and order type.",
    },
    {
      question: "Why might my cashback be missing or lower than expected?",
      answer:
        "Cashback may be declined or reduced for several reasons, such as:\n- using other coupons or ad blockers that break tracking,\n- cancelling or returning the order,\n- purchasing items that are excluded from cashback,\n- or switching to another tab or price-comparison site before checkout.\nIn a future version, we will provide more detailed rules per store.",
    },
    {
      question: "Is RebateHub free to use?",
      answer:
        "Yes. RebateHub is free for shoppers. We earn a commission from partner merchants when your purchase is successfully tracked, and we share part of that commission with you as cashback.",
    },
    {
      question: "Can I still use coupon codes with cashback?",
      answer:
        "In many cases, yes, but it depends on each merchant's rules. Some stores allow cashback together with eligible coupons, while others may not pay cashback if you use certain promo codes. Always check the store's terms for details.",
    },
    {
      question: "What happens if I cancel or return my order?",
      answer:
        "If your order is cancelled, refunded, or not fully completed, the merchant will not pay commission on that order. As a result, any associated cashback will be adjusted or cancelled as well.",
    },
  ];

  return (
    <>
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
              Store List
            </h1>
            <p className="text-xs text-[#6B7280]">
              The following stores are provided by FatCoupon. Cashback rates are for
              reference only.
            </p>
          </div>

          <form
            className="flex w-full max-w-xs items-center gap-2"
            method="GET"
            action="/"
          >
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search stores (e.g. Nike, travel, shoes)…"
              className="h-9 flex-1 rounded-full border border-zinc-300 px-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <input type="hidden" name="page" value="1" />
            {categoryId && categoryId !== "all" && (
              <input type="hidden" name="category" value={categoryId} />
            )}
            <button
              type="submit"
              className="h-9 whitespace-nowrap rounded-full bg-orange-500 px-4 text-xs font-medium text-white transition hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {CATEGORIES.map((cat) => {
            const selected = cat.id === categoryId;
            return (
              <Link
                key={cat.id}
                href={buildHref({ page: 1, category: cat.id })}
                className={`rounded-full border px-3 py-1 transition ${
                  selected
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-zinc-200 bg-white text-[#4B5563] hover:bg-zinc-50"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        <div className="space-y-3">
          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          )}
          {filteredItems.length === 0 ? (
            <p className="text-sm text-[#4B5563]">
              No stores found. Try another keyword or category.
            </p>
          ) : (
            filteredItems.map((store) => (
              <StoreCard
                key={store.id}
                name={store.name}
                domain={store.domain}
                logoUrl={store.image}
                cashbackText={store.affCommissionRate}
                storeId={store.domain || store.name}
                merchantId={store.id}
              />
            ))
          )}
        </div>

        {isAllMode ? (
          <div className="mt-4 flex items-center justify-between text-xs text-[#6B7280]">
            <span>
              Page {page} · Showing {filteredItems.length} of {total}
            </span>
            <div className="flex gap-2">
              <Link
                href={hasPrev ? buildHref({ page: page - 1 }) : "#"}
                aria-disabled={!hasPrev}
                className={`rounded-full border border-zinc-200 px-3 py-1 ${
                  hasPrev
                    ? "text-[#111827] hover:bg-zinc-50"
                    : "cursor-not-allowed text-zinc-400"
                }`}
              >
                Previous
              </Link>
              <Link
                href={hasNext ? buildHref({ page: page + 1 }) : "#"}
                aria-disabled={!hasNext}
                className={`rounded-full border border-zinc-200 px-3 py-1 ${
                  hasNext
                    ? "text-[#111827] hover:bg-zinc-50"
                    : "cursor-not-allowed text-zinc-400"
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-xs text-[#6B7280]">
            <span>
              Showing {filteredItems.length}{" "}
              {CATEGORIES.find((c) => c.id === categoryId)?.label ?? "stores"} stores
            </span>
          </div>
        )}
      </section>

      <section className="mt-8 w-full rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-6 shadow-sm sm:p-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#6B7280]">
              Learn how RebateHub cashback works and what to expect when you shop
              through our partner stores.
            </p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
