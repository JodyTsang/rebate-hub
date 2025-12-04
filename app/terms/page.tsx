import React from "react";

export default function TermsPage() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827] mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-[#4B5563] mb-4">
          These Terms describe how you may use the RebateHub demo site. They are
          kept simple for this prototype and are not a full legal contract.
        </p>

        <div className="space-y-4 text-sm text-[#4B5563]">
          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              1. Using RebateHub
            </h2>
            <p>
              RebateHub is provided for personal, non-commercial use in this demo
              environment. By browsing stores and clicking &quot;Get Cashback&quot;, you
              agree to use the site in a fair and lawful way and to respect the
              terms of our partner merchants.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              2. Cashback tracking
            </h2>
            <p>
              In this prototype, cashback tracking is illustrative only. Rates are
              for reference and do not represent guaranteed payouts. In a real
              production environment, actual tracking and approval would be
              handled by partner stores and affiliate networks, and subject to
              their rules and validation processes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              3. Payouts
            </h2>
            <p>
              This demo does not process real cashback payouts. Any balances or
              statuses shown are example data designed to demonstrate how a
              cashback dashboard could look. In a future production version,
              separate payout terms would explain eligibility, minimum payout
              thresholds and timing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              4. Prohibited behaviour
            </h2>
            <p>
              You agree not to abuse the site, attempt to manipulate tracking,
              reverse engineer the system, or use the service for fraudulent or
              illegal activities. We may restrict access to the demo if we detect
              behaviour that harms the service or other users.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              5. Changes to this demo
            </h2>
            <p>
              Because this is a prototype, features, layouts and content may
              change frequently. We may update these Terms from time to time as
              the product evolves. If significant changes are made, we may update
              the date of this page or highlight the changes in the interface.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-1">
              6. Contact
            </h2>
            <p>
              If you have questions about these Terms or how RebateHub works,
              please contact us through our usual channels. Your feedback helps
              shape how a future production version of RebateHub could operate.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
