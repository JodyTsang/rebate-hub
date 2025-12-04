export default function StoreDetailLoading() {
  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 animate-pulse rounded-2xl bg-zinc-200" />
          <div className="space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />
            <div className="h-3 w-32 animate-pulse rounded bg-zinc-200" />
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <div className="h-3 w-24 animate-pulse rounded bg-zinc-200" />
          <div className="h-8 w-32 animate-pulse rounded-full bg-zinc-200" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-zinc-200" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-200" />
      </div>
      <div className="space-y-2 border-t border-zinc-100 pt-4">
        <div className="h-3 w-28 animate-pulse rounded bg-zinc-200" />
        <div className="h-3 w-full animate-pulse rounded bg-zinc-200" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-200" />
      </div>
    </section>
  );
}
