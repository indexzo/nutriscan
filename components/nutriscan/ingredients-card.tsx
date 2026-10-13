"use client"

import { FlaskConical, Leaf } from "lucide-react"
import { BentoCard, CardHeader } from "./bento-card"

type IngredientsCardProps = {
  ingredients: string | null
  additives: string[]
}

export function IngredientsCard({ ingredients, additives }: IngredientsCardProps) {
  return (
    <BentoCard index={4} className="md:col-span-3 xl:col-span-2">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <CardHeader icon={Leaf} title="Ingredients" subtitle="As listed on the packaging" />
          {ingredients ? (
            <p className="text-pretty text-[15px] leading-relaxed text-zinc-300 first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-emerald-300">
              {ingredients}
            </p>
          ) : (
            <p className="rounded-2xl border border-[#222228] bg-[#09090b]/60 px-4 py-3 text-sm text-[#a1a1aa]">
              Ingredient list not available for this product.
            </p>
          )}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-amber-400/15 bg-amber-950/20 p-5 shadow-[inset_0_0_40px_-16px_rgba(251,191,36,0.25)]">
          <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="relative">
            <CardHeader
              icon={FlaskConical}
              title="Additives"
              subtitle={additives.length ? `${additives.length} found` : "None detected"}
              accent="border-amber-400/25 bg-amber-400/10 text-amber-300 shadow-[0_0_20px_-6px_rgba(251,191,36,0.6)]"
            />
            {additives.length ? (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {additives.map((a) => (
                  <li
                    key={a}
                    className="rounded-2xl border border-amber-400/20 bg-[#09090b]/60 px-3 py-2.5 text-center font-mono text-sm font-semibold text-amber-300 transition-all duration-500 hover:-translate-y-0.5 hover:border-amber-400/40 hover:shadow-[0_0_24px_-8px_rgba(251,191,36,0.6)]"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl border border-emerald-400/25 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300 shadow-[0_0_24px_-10px_rgba(52,245,197,0.5)]">
                Clean label — no additives detected.
              </p>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
