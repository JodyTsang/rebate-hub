export type BlogPostCategory = "Cashback Tips" | "Shopping Guide" | "Brand Insights";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogPostCategory;
  summary: string;
  readTime: string;
  publishedAt: string; // ISO string or plain text
  heroImageUrl?: string;
  heroLabel: string;
  content: string; // markdown-like content
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-cashback-works",
    category: "Cashback Tips",
    title: "How cashback actually works — explained simply",
    summary:
      "Learn the basic flow of cashback: from clicking a tracking link, to store verification, to receiving your payout.",
    readTime: "4 min read",
    publishedAt: "2025-01-10",
    heroImageUrl: "https://placehold.co/800x400?text=Cashback+Flow",
    heroLabel: "Cashback Flow",
    content: `# How cashback actually works — explained simply

Cashback sounds almost too good to be true: you shop as usual and somehow get money back later. In reality, it’s just a clear and trackable way to share advertising commissions with shoppers.

This guide walks through the cashback flow step by step so you know exactly what happens when you click “Get Cashback” on RebateHub.

## 1. Stores pay for referred sales

Most online stores work with affiliate or partner networks. Instead of paying for vague “branding” ads, they pay commissions for real sales.  
When a partner like RebateHub sends a shopper who actually buys something, the store pays a small percentage of that order as a commission.

## 2. RebateHub shares part of that commission with you

Traditional affiliates usually keep the entire commission. Cashback sites are different: we share part of that commission with you, the shopper, in the form of cashback.

You still pay the same price on the store’s official website, but after the order is confirmed, you receive a portion of the commission back.

## 3. What happens when you click “Get Cashback”

When you click “Get Cashback” on RebateHub, we send you to the merchant with a special tracking link. This link contains anonymous identifiers that let the affiliate network know:

- which store you visited  
- which partner (RebateHub) referred you  
- when the click happened

If you place an order in that session, the network can connect the purchase back to RebateHub.

## 4. Pending vs confirmed cashback

Once your transaction is tracked, a pending cashback entry can be created. It stays “pending” because:

- the store may need to ship the product  
- the return / cancellation window may still be open  
- the affiliate network hasn’t paid the commission yet

When the order is final and the store pays the commission, your cashback becomes confirmed and can be prepared for payout according to RebateHub’s rules.

## 5. Why cashback is not instant

Cashback isn’t like a coupon that reduces your price immediately. Instead, it depends on the store and network confirming that your order is valid and hasn’t been returned. This is why cashback often appears with a delay.

Understanding this timeline helps set realistic expectations: cashback is real, but it follows the business cycle of each store, not the speed of your checkout page.
`,
  },
  {
    slug: "best-fashion-cashback-stores",
    category: "Shopping Guide",
    title: "10 best fashion stores with high cashback rates",
    summary:
      "A curated list of fashion retailers that consistently offer the highest cashback returns.",
    readTime: "5 min read",
    publishedAt: "2025-01-18",
    heroImageUrl: "https://placehold.co/800x400?text=Fashion+Cashback",
    heroLabel: "Fashion Deals",
    content: `# 10 best fashion stores with high cashback rates

Fashion is one of the most rewarding categories for cashback. Margins are often higher, and brands run frequent promotions that can stack with cashback.

This guide gives a general idea of what “high cashback” looks like and how to choose which fashion stores to prioritize.

## 1. Look beyond the brand name

Big logos don’t always mean the best savings. Sometimes mid-sized fashion retailers offer higher cashback to attract new customers. When comparing stores, check:

- the headline cashback rate  
- how often the rate changes  
- whether sale items are eligible

A smaller brand with 8% cashback can easily outperform a global brand at 1–2%.

## 2. Mix global brands with niche labels

A healthy fashion cashback strategy includes both:

- global brands for essentials and basics  
- niche labels for unique items and higher cashback

Using a mix lets you keep your style consistent while maximizing returns over the course of a year.

## 3. Stack cashback with seasonal promotions

Fashion has clear sale cycles: mid-season sales, Black Friday, Cyber Monday, year-end clearance, and more. Rates sometimes increase during these periods, and stores might offer extra coupons.

The key is simple: start every purchase from RebateHub, then apply any code or promotion directly on the merchant site. You still earn cashback as long as the terms allow it.

## 4. Watch out for exclusions

Some fashion merchants exclude specific categories from cashback, such as:

- outlet or clearance sections  
- gift cards  
- luxury collaborations

Always skim the store’s terms before a big purchase. Five seconds of checking can protect a lot of potential cashback.

## 5. Build a shortlist of your “go-to” stores

You don’t need a list of 100 brands. Start with 5–10 fashion merchants that:

- match your size and style  
- have stable cashback rates  
- ship reliably to your region

Then simply make it a habit: whenever you shop from those brands, begin at RebateHub and click “Get Cashback” first.
`,
  },
  {
    slug: "amazon-cashback-guide",
    category: "Brand Insights",
    title: "Amazon cashback — what you can really earn",
    summary:
      "A breakdown of how Amazon cashback varies by category and what shoppers should expect.",
    readTime: "3 min read",
    publishedAt: "2025-01-22",
    heroImageUrl: "https://placehold.co/800x400?text=Amazon+Cashback",
    heroLabel: "Amazon Cashback Guide",
    content: `# Amazon cashback — what you can really earn

Amazon is one of the most popular destinations for online shopping, so it’s natural to ask: can you earn cashback on Amazon purchases, and how much?

The short answer is: it depends on the category, the region, and the current partner program rules.

## 1. Category-based rates

When cashback is available on Amazon, it usually varies by product category. For example, fashion or home goods may earn a different rate compared to tech accessories or digital content.

It’s normal for some categories to have very low rates or not be eligible at all. Always read the store’s terms before assuming everything qualifies.

## 2. Limitations and exclusions

Amazon has stricter rules than many retailers. Common limitations include:

- certain categories being excluded  
- no cashback on gift cards or subscriptions  
- orders placed through the mobile app not being tracked reliably

To maximize the chance of tracking, start from RebateHub on a desktop or mobile browser, click “Get Cashback”, and complete the purchase in the same session.

## 3. Small percentages can still add up

Even if the cashback percentage looks modest, the volume of Amazon shopping can make it meaningful over a year. Think of it as a passive rebate on purchases you would likely make anyway.

The key is consistency: if you habitually start your Amazon visits from RebateHub, those small percentages accumulate in the background.
`,
  },
  {
    slug: "cashback-mistakes-to-avoid",
    category: "Cashback Tips",
    title: "7 common cashback mistakes to avoid",
    summary:
      "New shoppers often miss cashback due to these errors. Learn how to avoid them effortlessly.",
    readTime: "4 min read",
    publishedAt: "2025-01-25",
    heroImageUrl: "https://placehold.co/800x400?text=Cashback+Mistakes",
    heroLabel: "Smart Shopping Tips",
    content: `# 7 common cashback mistakes to avoid

Cashback is simple in theory, but it still relies on correct tracking. Small habits can decide whether a purchase earns cashback or not.

Here are seven common mistakes and how to avoid them.

## 1. Not starting from the cashback site

If you go directly to the store, then come back to RebateHub later, the tracking link may not be recognized. Always:

1. Start on RebateHub  
2. Click “Get Cashback”  
3. Complete the purchase in that session

## 2. Using multiple tabs or windows

If you open several tabs, some stores may only track the most recent click from a different source. To be safe, keep the RebateHub → store journey in a single tab whenever possible.

## 3. Applying external coupon extensions

Some browser extensions override tracking links with their own. This can “steal” the credit for your purchase and cause cashback to disappear.

If you want to use coupons, apply codes manually or from the store itself, not from conflicting extensions.

## 4. Clearing cookies mid-purchase

Tracking relies on cookies and session data. Clearing cookies, switching browsers, or using private mode in the middle of your shopping session can break tracking.

## 5. Returning or cancelling the order

If an order is fully refunded, most stores will not pay commission on it — and therefore no cashback can be paid out. This is normal and part of the standard rules.

## 6. Waiting too long to check your account

In a full version of RebateHub, you would see pending cashback within a certain time window. If something seems missing, it’s easier to investigate while details are still fresh.

## 7. Ignoring the store’s terms

Each merchant can set its own rules. Reading the terms once before a large purchase is often enough to avoid surprises later.
`,
  },
  {
    slug: "best-travel-cashback-sites-2025",
    category: "Shopping Guide",
    title: "Best travel sites that offer cashback in 2025",
    summary:
      "Top travel platforms like Booking, Expedia, and Agoda offer cashback you may not know about.",
    readTime: "6 min read",
    publishedAt: "2025-02-02",
    heroImageUrl: "https://placehold.co/800x400?text=Travel+Cashback",
    heroLabel: "Travel Savings",
    content: `# Best travel sites that offer cashback in 2025

Travel bookings can be expensive, which makes them perfect for cashback. A small percentage on flights, hotels, or packages can translate into meaningful savings.

This guide explains how to think about travel cashback rather than focusing on one specific brand.

## 1. Understand what part of the booking earns cashback

Some travel platforms only pay commissions on the service fee, not the full booking amount. Others exclude taxes and fees. This means the effective cashback can be lower than the headline percentage.

Always treat the percentage as an estimate, not a guaranteed discount on the entire amount.

## 2. Consider flexibility and support, not just the rate

A platform with slightly lower cashback but better customer service may still be a smarter choice, especially for complex trips. When something goes wrong, responsive support is more valuable than a tiny extra rebate.

## 3. Use cashback on repeat bookings

Travel cashback shines when you book multiple trips in a year: weekend getaways, business travel, family visits, and more. Consistently starting from RebateHub helps turn each booking into a small rebate.

## 4. Watch out for exclusions on corporate rates and coupons

Some travel merchants exclude:

- corporate or negotiated rates  
- bookings made with certain coupon codes  
- bookings changed over the phone after being made online

Reading the fine print helps avoid disappointment later.

## 5. Combine loyalty programs with cashback

In many cases you can still earn hotel or airline loyalty points while also earning cashback, as long as you follow the store’s rules. This “double earning” is one of the biggest advantages of using cashback on travel.
`,
  },
  {
    slug: "sephora-cashback-guide",
    category: "Brand Insights",
    title: "Sephora cashback — everything you should know",
    summary:
      "How Sephora’s cashback works, why rates fluctuate, and tips to maximize your savings.",
    readTime: "3 min read",
    publishedAt: "2025-02-06",
    heroImageUrl: "https://placehold.co/800x400?text=Sephora+Cashback",
    heroLabel: "Sephora Cashback Overview",
    content: `# Sephora cashback — everything you should know

Beauty lovers often shop at Sephora for skincare, makeup, and fragrance. Earning cashback on those orders can make a real difference over time.

Here is what to keep in mind when shopping at Sephora through RebateHub.

## 1. Rates can change during big campaigns

Cashback rates may increase during special events or decrease when a store runs aggressive internal promotions. This is normal and reflects Sephora’s marketing strategy for each period.

Before a big haul, check the current rate shown on RebateHub.

## 2. Not every item may be eligible

Some categories, sets, or limited-edition collaborations might be excluded from cashback. Gift cards are very commonly excluded.

When rules are available, review them quickly so you know what to expect.

## 3. Combine loyalty points with cashback

One advantage of Sephora is its loyalty program. You may still earn loyalty points on eligible purchases while also earning cashback, as long as the conditions don’t conflict.

This combination can stretch your beauty budget much further over the long run.

## 4. Keep your routine, just add one extra step

The easiest way to use cashback with Sephora is to keep your usual routine:

1. Decide what you want to buy  
2. Visit RebateHub and find Sephora  
3. Click “Get Cashback”  
4. Shop as normal on Sephora’s official website

That single extra click is often the only change needed to start earning cashback on your regular beauty purchases.
`,
  },
];
