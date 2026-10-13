import { cn } from "@/lib/utils"

function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={cn("bg-zinc-800/70", className)} style={style} />
}

function Shell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:p-7",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-emerald-300/[0.07] to-transparent"
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
          <Bone className="aspect-[4/3] md:aspect-auto md:h-72 md:w-96" />
          <div className="flex flex-1 flex-col gap-4 p-8">
            <Bone className="h-6 w-28 rounded-full" />
            <Bone className="h-10 w-3/4 rounded-xl" />
            <Bone className="h-10 w-1/2 rounded-xl" />
            <Bone className="mt-auto h-14 w-72 rounded-2xl" />
          </div>
        </div>
      </Shell>
      <Shell>
        <Bone className="mb-8 h-9 w-40 rounded-xl" />
        <Bone className="mx-auto size-28 rounded-[2rem]" />
        <Bone className="mx-auto mt-8 h-3 w-full rounded-full" />
      </Shell>
      <Shell>
        <Bone className="mb-8 h-9 w-40 rounded-xl" />
        <div className="mx-auto flex size-44 items-center justify-center rounded-full bg-zinc-800/70">
          <div className="size-28 rounded-full bg-zinc-900" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <Bone className="h-14 rounded-2xl" />
          <Bone className="h-14 rounded-2xl" />
          <Bone className="h-14 rounded-2xl" />
        </div>
      </Shell>
      <Shell className="md:col-span-2 lg:col-span-1">
        <Bone className="mb-6 h-9 w-40 rounded-xl" />
        <div className="flex flex-wrap gap-2">
          {[20, 24, 16, 28, 20].map((w, i) => (
            <Bone key={i} className="h-7 rounded-full" style={{ width: `${w * 4}px` }} />
          ))}
        </div>
      </Shell>
      <Shell className="md:col-span-2 lg:col-span-3">
        <Bone className="mb-6 h-9 w-40 rounded-xl" />
        <div className="space-y-3">
          <Bone className="h-4 w-full rounded-full" />
          <Bone className="h-4 w-11/12 rounded-full" />
          <Bone className="h-4 w-4/5 rounded-full" />
        </div>
      </Shell>
      <span className="sr-only">Loading product data…</span>
    </div>
  )
}
