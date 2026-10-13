"use client"

import { AlertTriangle, BadgeCheck, ShieldCheck } from "lucide-react"
import { BentoCard, CardHeader } from "./bento-card"

type TagsCardProps = {
  allergens: string[]
  labels: string[]
}

export function TagsCard({ allergens, labels }: TagsCardProps) {
  return (
    <BentoCard index={3} className="flex flex-col gap-6">
      <div>
        <CardHeader
          icon={AlertTriangle}
          title="Allergens"
          subtitle={allergens.length ? `${allergens.length} detected` : "None declared"}
          accent="from-red-50 to-rose-50 text-red-600"
        />
        {allergens.length ? (
          <ul className="flex flex-wrap gap-2">
            {allergens.map((a) => (
              <li
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-[0_8px_20px_-10px_rgba(239,68,68,0.6)]"
              >
                <AlertTriangle className="size-3" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center gap-2 rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-500" aria-hidden />
            No allergens listed for this product.
          </p>
        )}
      </div>

      <div className="h-px bg-border" aria-hidden />

      <div>
        <CardHeader
          icon={BadgeCheck}
          title="Labels & Certifications"
          subtitle={labels.length ? `${labels.length} labels` : "None listed"}
        />
        {labels.length ? (
          <ul className="flex flex-wrap gap-2">
            {labels.slice(0, 14).map((l) => (
              <li
                key={l}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-[0_8px_20px_-10px_rgba(16,185,129,0.6)]"
              >
                <BadgeCheck className="size-3" aria-hidden />
                {l}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">No labels available.</p>
        )}
      </div>
    </BentoCard>
  )
}
