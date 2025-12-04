export default function Loading() {
  return (
    <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="h-5 w-40 animate-pulse rounded bg-zinc-200" />
      <div className="h-3 w-64 animate-pulse rounded bg-zinc-100" />
      <div className="mt-4 space-y-2">
        <div className="h-14 w-full animate-pulse rounded-2xl bg-zinc-100" />
        <div className="h-14 w-full animate-pulse rounded-2xl bg-zinc-100" />
        <div className="h-14 w-full animate-pulse rounded-2xl bg-zinc-100" />
      </div>
    </section>
  );
}
