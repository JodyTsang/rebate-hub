import Link from "next/link";
import { FaqAccordion } from "@/src/components/FaqAccordion";

export default function HowItWorksPage() {
  const faqItems = [
    {
      question: "Do I need to create an account to earn cashback?",
      answer:
        "For this demo, we focus on explaining how cashback works. In a full version of RebateHub, you would create an account to view and manage your cashback history.",
    },
    {
      question: "How long does it take for cashback to show up?",
      answer:
        "In real-world scenarios, tracked purchases often appear as pending within a few hours to a few days. Confirmation can take longer, depending on the store's return and payment cycles.",
    },
    {
      question: "What if my purchase doesn't track?",
      answer:
        "Cashback requires correct tracking. Using ad blockers, switching devices, or not completing the purchase in the same session can cause tracking issues. A full version of RebateHub would provide support guidelines for these cases.",
    },
    {
      question: "Is cashback guaranteed?",
      answer:
        "Cashback is not guaranteed. The store must report and approve the transaction via the affiliate network. If the order is cancelled, returned, or not approved by the merchant, cashback may not be paid.",
    },
  ];

  return (
    <section className="space-y-8">
      {/* Hero section */}
      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
          How RebateHub cashback works
        </h1>
        <div className="space-y-2 text-sm text-[#4B5563]">
          <p>
            RebateHub lets you earn cashback when you start your shopping journey from our
            site.
          </p>
          <p>
            Click "Get Cashback", complete your purchase on the store's official website, and
            we share part of the commission with you as cashback.
          </p>
        </div>
        <div className="space-y-2 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Start earning cashback
          </Link>
          <div>
            <Link
              href="/"
              className="text-[11px] font-medium text-orange-600 hover:text-orange-700"
            >
              Browse all stores
            </Link>
          </div>
        </div>
      </div>

      {/* Three-step process */}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Earn cashback in 3 simple steps
          </h2>
          <p className="text-xs text-[#6B7280]">
            From browsing stores to receiving confirmed cashback, the process is designed to be
            simple and transparent.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-orange-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                1
              </span>
              <span>Step 1</span>
            </div>
            <h3 className="text-sm font-semibold text-[#111827]">
              Browse stores on RebateHub
            </h3>
            <p className="text-xs text-[#4B5563]">
              Search or browse hundreds of partner stores on RebateHub. Each store shows how
              much cashback you can earn on your purchase.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-orange-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                2
              </span>
              <span>Step 2</span>
            </div>
            <h3 className="text-sm font-semibold text-[#111827]">
              Click "Get Cashback" and shop
            </h3>
            <p className="text-xs text-[#4B5563]">
              When you're ready, click the "Get Cashback" button. We redirect you to the
              store's official website with a special tracking link. Shop and pay as you
              normally would.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-orange-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                3
              </span>
              <span>Step 3</span>
            </div>
            <h3 className="text-sm font-semibold text-[#111827]">
              Get cashback after your purchase
            </h3>
            <p className="text-xs text-[#4B5563]">
              Once the merchant confirms your order, the commission is shared with us. We then
              pass part of that commission back to you as cashback.
            </p>
          </div>
        </div>
      </section>

      {/* Post-click timeline */}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            What happens after you click "Get Cashback"?
          </h2>
          <p className="text-xs text-[#6B7280]">
            A simple timeline showing what happens behind the scenes after you start your
            purchase from RebateHub.
          </p>
        </div>

        <div className="relative grid gap-4 md:grid-cols-4">
          {/* Connecting line for desktop */}
          <div className="pointer-events-none absolute inset-x-4 top-7 hidden h-px bg-zinc-200 md:block" />

          <div className="relative space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <div className="flex items-center gap-2 text-[11px] font-medium text-orange-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                1
              </span>
              <span>Click</span>
            </div>
            <p className="text-[11px]">
              You click "Get Cashback" on RebateHub and we send you to the store using a
              tracked link.
            </p>
          </div>

          <div className="relative space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <div className="flex items-center gap-2 text-[11px] font-medium text-orange-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                2
              </span>
              <span>Tracking</span>
            </div>
            <p className="text-[11px]">
              The store and our partner network record your visit and any purchases made
              during that session.
            </p>
          </div>

          <div className="relative space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <div className="flex items-center gap-2 text-[11px] font-medium text-orange-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                3
              </span>
              <span>Pending cashback</span>
            </div>
            <p className="text-[11px]">
              If your purchase is tracked successfully, a pending cashback amount is created.
              It stays pending while the order is still within the return or cancellation
              period.
            </p>
          </div>

          <div className="relative space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <div className="flex items-center gap-2 text-[11px] font-medium text-orange-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                4
              </span>
              <span>Confirmed cashback</span>
            </div>
            <p className="text-[11px]">
              After the store confirms your order and pays the commission, your cashback
              becomes confirmed and can be prepared for payout according to RebateHub's
              rules.
            </p>
          </div>
        </div>
      </section>

      {/* Cashback status explanation */}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Understanding cashback statuses
          </h2>
          <p className="text-xs text-[#6B7280]">
            Cashback usually moves through a few stages before it can be paid out.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <h3 className="text-sm font-semibold text-[#111827]">Pending</h3>
            <p>
              Your purchase has been tracked, but the store has not confirmed it yet. This
              usually lasts until the return or cancellation window has passed.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <h3 className="text-sm font-semibold text-[#111827]">Confirmed</h3>
            <p>
              The store has confirmed your order and paid the commission to our partner
              network. Your cashback is now confirmed and can be prepared for payout.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <h3 className="text-sm font-semibold text-[#111827]">Paid out</h3>
            <p>
              Once available payout methods are implemented, confirmed cashback can be paid
              out according to RebateHub's payout rules.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#9CA3AF]">
          This demo focuses on how cashback works. Payout features and user accounts will be
          introduced in future versions of RebateHub.
        </p>
      </section>

      {/* Why use RebateHub */}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
            Why shop with RebateHub?
          </h2>
          <p className="text-xs text-[#6B7280]">
            Simple cashback, clear explanations, and shopping directly on official store
            websites.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <h3 className="text-sm font-semibold text-[#111827]">Free to use</h3>
            <p>
              RebateHub is free for shoppers. Stores pay commissions when you complete a
              purchase, and we share part of that with you as cashback.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <h3 className="text-sm font-semibold text-[#111827]">
              Powered by trusted partners
            </h3>
            <p>
              We use tracking and commission data from established affiliate networks like
              FatCoupon's partner platform.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <h3 className="text-sm font-semibold text-[#111827]">One-click cashback</h3>
            <p>
              You don't need special promo codes. Just start from RebateHub, click "Get
              Cashback", and shop as normal.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-4 text-xs text-[#4B5563]">
            <h3 className="text-sm font-semibold text-[#111827]">Official store websites</h3>
            <p>
              You always complete your purchase directly on the merchant's official website,
              with their normal checkout and security.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-[#F9FAFB] p-6 shadow-sm sm:p-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#111827]">
              Frequently asked questions
            </h2>
            <p className="text-xs text-[#6B7280]">
              Answers to common questions about how cashback tracking and statuses work on
              RebateHub.
            </p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-xs text-[#4B5563] sm:p-8">
        <div className="flex flex-col gap-3 items-start justify-between sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm text-[#4B5563]">
            Ready to try it out? Start your next purchase through RebateHub and see how
            cashback works.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Browse stores
          </Link>
        </div>
      </section>
    </section>
  );
}
