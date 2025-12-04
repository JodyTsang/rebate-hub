import React from "react";

export default function PrivacyPage() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827] mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#4B5563] mb-4">
          This Privacy Policy describes how RebateHub handles data in this demo
          environment. It is not a full legal document, but is meant to explain
          our approach in simple terms.
        </p>

        <div className="space-y-4 text-sm text-[#4B5563]">
          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              What data we collect
            </h2>
            <p>
              In this prototype, we may collect basic information you provide,
              such as email address and account details when you sign up or log
              in. We may also log events like store clicks and page views to
              understand how the demo is used.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              How we use your information
            </h2>
            <p>
              Data is used to operate the demo experience, improve the product
              design, and understand overall usage patterns. We do not sell your
              personal data. Any analytics we run are focused on product
              performance, not individual profiling.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Third-party partners
            </h2>
            <p>
              RebateHub relies on third-party services (such as FatCoupon,
              Supabase or analytics tools) to power key features. These services
              may process data on our behalf in accordance with their own privacy
              practices.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Cookies and tracking
            </h2>
            <p>
              We may use cookies or similar technologies to keep you logged in,
              remember preferences, and attribute clicks to partner stores. You
              can usually control cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Your choices
            </h2>
            <p>
              If you do not want your demo data to be used, you can stop using
              the site at any time. For account-level requests (such as deleting a
              demo account), please contact us and we will do our best to help.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy or how data is
              handled in this demo, please reach out through our usual contact
              channels.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}