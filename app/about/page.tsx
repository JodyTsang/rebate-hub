import React from "react";

export default function AboutPage() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827] mb-3">
          About RebateHub
        </h1>
        <p className="text-sm text-[#4B5563] mb-4">
          RebateHub is a prototype cashback experience that helps users discover
          stores, click &quot;Get Cashback&quot; and earn a share of the commission we
          receive from our partners. This site is currently a demo and does not
          process real payments.
        </p>

        <div className="space-y-4 text-sm text-[#4B5563]">
          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              What RebateHub does
            </h2>
            <p>
              Our goal is to make cashback simple and transparent. You can browse
              partner stores, see indicative cashback rates for reference, and
              start your shopping journey from RebateHub. The experience is
              designed to feel like a modern cashback product, with clean
              navigation, clear store cards, and a dedicated cashback dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Partnership with FatCoupon
            </h2>
            <p>
              In this prototype we use data and technology powered by FatCoupon
              and FatCoupon&apos;s APIs. Store information, cashback rates and many
              of the links you see are sourced from FatCoupon. All cashback rates
              and offer details are for reference only and may differ from the
              final commission approved by each store in a real production
              environment.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Demo / beta status
            </h2>
            <p>
              This project is currently in a demo / beta phase. The flows are
              built to demonstrate how a real cashback site could work: store
              discovery, click-out tracking, and a &quot;My Cashback&quot; dashboard.
              However, actual cashback tracking, approval and payout are not
              enabled in this environment. Any balances or records you see are
              sample or demo data only.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Future directions
            </h2>
            <p>
              A full version of RebateHub would include richer store coverage,
              personalized recommendations, detailed order-level tracking and
              real payout options. This demo lays the foundation for those ideas
              while staying focused on a simple, easy-to-understand experience.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Contact
            </h2>
            <p>
              If you have questions, feedback, or business ideas about RebateHub,
              you can reach out to us through our usual contact channels. We are
              always interested in learning how to make the cashback experience
              clearer, fairer and more rewarding for users.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
