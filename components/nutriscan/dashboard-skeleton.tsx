import { Skeleton } from "@/components/ui/skeleton"

function Shell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.12)] sm:p-7 ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-emerald-50/70 to-transparent"
      />
      {children}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading product" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Shell className="p-0 sm:p-0 md:col-span-2 lg:col-span-3">
        <div className="flex flex-col md:flex-row">
          <Skeleton className="aspect-[4/3] rounded-none md:aspect-auto md:h-72 md:w-96" />
          <div className="flex flex-1 flex-col gap-4 p-8">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <Skeleton className="h-10 w-1/2 rounded-xl" />
            <Skeleton className="mt-auto h-14 w-72 rounded-2xl" />
          </div>
        </div>
      </Shell>
      <Shell>
        <Skeleton className="mb-8 h-9 w-40 rounded-xl" />
        <Skeleton className="mx-auto size-28 rounded-[2rem]" />
        <Skeleton className="mx-auto mt-8 h-3 w-full rounded-full" />
      </Shell>
      <Shell>
        <Skeleton className="mb-8 h-9 w-40 rounded-xl" />
        <Skeleton className="mx-auto size-44 rounded-full" />
        <div className="mt-6 grid grid-cols-3 gap-2">
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
        </div>
      </Shell>
      <Shell className="md:col-span-2 lg:col-span-1">
        <Skeleton className="mb-6 h-9 w-40 rounded-xl" />
        <div className="flex flex-wrap gap-2">
          {[20, 24, 16, 28, 20].map((w, i) => (
            <Skeleton key={i} className="h-7 rounded-full" style={{ width: `${w * 4}px` }} />
          ))}
        </div>
      </Shell>
      <Shell className="md:col-span-2 lg:col-span-3">
        <Skeleton className="mb-6 h-9 w-40 rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-11/12 rounded-full" />
          <Skeleton className="h-4 w-4/5 rounded-full" />
        </div>
      </Shell>
      <span className="sr-only">Loading product data…</span>
    </div>
  )
}
