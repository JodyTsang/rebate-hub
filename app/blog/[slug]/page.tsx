import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/src/lib/blogData";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

function renderContent(content: string) {
  const blocks = content.split("\n\n");

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("# ")) {
      return (
        <h2
          key={index}
          className="mt-6 text-xl font-semibold text-slate-900"
        >
          {trimmed.slice(2)}
        </h2>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h3
          key={index}
          className="mt-4 text-lg font-semibold text-slate-900"
        >
          {trimmed.slice(3)}
        </h3>
      );
    }

    return (
      <p
        key={index}
        className="mt-2 text-sm leading-relaxed text-slate-700"
      >
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  if (!post) {
    // for TypeScript; notFound() already throws
    return null;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-0">
      {/* Breadcrumb */}
      <nav className="mb-4 text-xs text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <span className="mx-1">/</span>
        <span className="text-slate-700">{post.title}</span>
      </nav>

      {/* Hero placeholder */}
      <div className="mb-6 flex h-72 items-center justify-center rounded-2xl bg-gray-100 text-4xl font-semibold text-gray-400">
        {post.heroLabel}
      </div>

      {/* Category pill */}
      <div className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
        {post.category}
      </div>

      {/* Title */}
      <h1 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">
        {post.title}
      </h1>

      {/* Meta */}
      <p className="mt-2 text-xs text-slate-500">
        {post.publishedAt} - {post.readTime}
      </p>

      {/* Content */}
      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        {renderContent(post.content)}
      </section>

      {/* Footer links */}
      <div className="mt-8 flex gap-3">
        <Link
          href="/blog"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Back to blog
        </Link>
        <Link
          href="/"
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          Browse stores
        </Link>
      </div>
    </main>
  );
}