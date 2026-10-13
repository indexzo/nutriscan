import { cn } from "@/lib/utils"

function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("animate-pulse bg-[#1a1a20] shadow-[0_0_24px_-8px_rgba(34,211,238,0.12)]", className)}
      style={style}
    />
  )
}

function Shell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#222228] bg-[#131316] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading product" className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
      <Shell className="p-0 sm:p-0 md:col-span-2">
        <div className="flex flex-col sm:flex-row">
          <Bone className="aspect-[4/3] sm:aspect-auto sm:h-80 sm:w-2/5" />
          <div className="flex flex-1 flex-col gap-4 p-7">
            <Bone className="h-6 w-28 rounded-full" />
            <Bone className="h-9 w-3/4 rounded-xl" />
            <Bone className="h-9 w-1/2 rounded-xl" />
            <Bone className="mt-auto h-14 w-full max-w-64 rounded-2xl" />
          </div>
        </div>
      </Shell>
      <Shell>
        <Bone className="mb-8 h-9 w-36 rounded-xl" />
        <Bone className="mx-auto size-28 rounded-[2rem]" />
        <Bone className="mx-auto mt-8 h-3 w-full rounded-full" />
      </Shell>
      <Shell>
        <Bone className="mb-8 h-9 w-36 rounded-xl" />
        <div className="mx-auto flex size-40 animate-pulse items-center justify-center rounded-full bg-[#1a1a20]">
          <div className="size-24 rounded-full bg-[#131316]" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <Bone className="h-14 rounded-2xl" />
          <Bone className="h-14 rounded-2xl" />
          <Bone className="h-14 rounded-2xl" />
        </div>
      </Shell>
      <Shell className="md:col-span-2">
        <Bone className="mb-6 h-9 w-36 rounded-xl" />
        <div className="flex flex-wrap gap-2">
          {[20, 24, 16, 28, 20].map((w, i) => (
            <Bone key={i} className="h-7 rounded-full" style={{ width: `${w * 4}px` }} />
          ))}
        </div>
      </Shell>
      <Shell className="md:col-span-3 xl:col-span-2">
        <Bone className="mb-6 h-9 w-36 rounded-xl" />
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
