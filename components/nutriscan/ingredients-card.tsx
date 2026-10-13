"use client"

import { FlaskConical, Leaf } from "lucide-react"
import { BentoCard, CardHeader } from "./bento-card"

type IngredientsCardProps = {
  ingredients: string | null
  additives: string[]
}

export function IngredientsCard({ ingredients, additives }: IngredientsCardProps) {
  return (
    <BentoCard index={4} className="md:col-span-2 lg:col-span-3">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <CardHeader icon={Leaf} title="Ingredients" subtitle="As listed on the packaging" />
          {ingredients ? (
            <p className="text-pretty text-[15px] leading-relaxed text-foreground/80 first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-emerald-600">
              {ingredients}
            </p>
          ) : (
            <p className="rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              Ingredient list not available for this product.
            </p>
          )}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-rose-50/60 p-5">
          <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-amber-300/30 blur-3xl" />
          <div aria-hidden className="absolute -bottom-12 -left-8 size-32 rounded-full bg-rose-300/20 blur-3xl" />
          <div className="relative">
            <CardHeader
              icon={FlaskConical}
              title="Additives"
              subtitle={additives.length ? `${additives.length} found` : "None detected"}
              accent="from-amber-100 to-orange-100 text-amber-700"
            />
            {additives.length ? (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {additives.map((a) => (
                  <li
                    key={a}
                    className="rounded-2xl border border-white/70 bg-white/50 px-3 py-2.5 text-center font-mono text-sm font-semibold text-amber-800 shadow-[0_4px_16px_-8px_rgba(217,119,6,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-emerald-700 backdrop-blur-md">
                Clean label — no additives detected.
              </p>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
