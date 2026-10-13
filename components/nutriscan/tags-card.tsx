"use client"

import { AlertTriangle, BadgeCheck, ShieldCheck } from "lucide-react"
import { BentoCard, CardHeader } from "./bento-card"

type TagsCardProps = {
  allergens: string[]
  labels: string[]
}

export function TagsCard({ allergens, labels }: TagsCardProps) {
  return (
    <BentoCard index={3} className="flex flex-col">
      <div className="flex flex-col gap-6">
        <div>
          <CardHeader
            icon={AlertTriangle}
            title="Allergens"
            subtitle={allergens.length ? `${allergens.length} detected` : "None declared"}
            accent="border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_20px_-6px_rgba(239,68,68,0.7)]"
          />
          {allergens.length ? (
            <ul className="flex flex-wrap gap-2">
              {allergens.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-950/60 px-3 py-1.5 text-xs font-semibold text-red-400 shadow-[0_0_16px_-4px_rgba(239,68,68,0.55),inset_0_0_12px_-4px_rgba(239,68,68,0.4)] transition-all duration-500 hover:-translate-y-0.5 hover:border-red-400 hover:text-red-300 hover:shadow-[0_0_24px_-2px_rgba(239,68,68,0.75),inset_0_0_12px_-4px_rgba(239,68,68,0.5)]"
                >
                  <span className="relative flex size-1.5" aria-hidden>
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-red-400" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-400">
              <ShieldCheck className="size-4 text-emerald-300" aria-hidden />
              No allergens listed for this product.
            </p>
          )}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" aria-hidden />

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
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-300 shadow-[0_0_14px_-6px_rgba(52,245,197,0.5)] transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-300/60 hover:shadow-[0_0_22px_-4px_rgba(52,245,197,0.6)]"
                >
                  <BadgeCheck className="size-3" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-400">
              No labels available.
            </p>
          )}
        </div>
      </div>
    </BentoCard>
  )
}
