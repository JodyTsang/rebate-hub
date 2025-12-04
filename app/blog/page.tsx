import Link from "next/link";
import { blogPosts } from "@/src/lib/blogData";

export default function BlogPage() {
  return (
    <section className="space-y-6">
      {/* Header section */}
      <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
          RebateHub Blog
        </h1>
        <p className="text-sm text-[#4B5563]">
          Guides and tips on how to earn cashback and shop smarter with
          RebateHub.
        </p>
        <p className="text-xs text-[#6B7280]">
          Learn how cashback works, discover shopping strategies, and explore
          brand insights from our team.
        </p>
      </div>

      {/* Posts list - vertical stack */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 text-xs text-[#4B5563] shadow-sm transition hover:shadow-md"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-[11px] font-medium text-orange-700">
                {post.category}
              </span>

              <div className="space-y-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-[#111827] hover:text-orange-600"
                >
                  {post.title}
                </Link>
                <p className="line-clamp-3 text-xs text-[#4B5563]">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-[#6B7280]">
              <span>
                {post.publishedAt} - {post.readTime}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-[11px] font-medium text-orange-600 hover:text-orange-700"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}