"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"
import type { NutriGrade } from "@/lib/openfoodfacts"
import { cn } from "@/lib/utils"
import { BentoCard, CardHeader } from "./bento-card"

const GRADES: NutriGrade[] = ["a", "b", "c", "d", "e"]

const STYLES: Record<NutriGrade, { badge: string; glow: string; bar: string; label: string }> = {
  a: { badge: "from-emerald-400 to-green-600", glow: "bg-emerald-400/50", bar: "bg-emerald-500", label: "Excellent nutritional quality" },
  b: { badge: "from-lime-400 to-green-500", glow: "bg-lime-400/50", bar: "bg-lime-500", label: "Good nutritional quality" },
  c: { badge: "from-yellow-300 to-amber-400", glow: "bg-yellow-300/60", bar: "bg-yellow-400", label: "Average nutritional quality" },
  d: { badge: "from-orange-400 to-orange-600", glow: "bg-orange-400/50", bar: "bg-orange-500", label: "Poor nutritional quality" },
  e: { badge: "from-red-400 to-rose-600", glow: "bg-red-400/50", bar: "bg-red-500", label: "Bad nutritional quality" },
}

export function NutriScoreCard({ grade }: { grade: NutriGrade | null }) {
  const style = grade ? STYLES[grade] : null

  return (
    <BentoCard index={1} className="flex flex-col">
      <CardHeader icon={Award} title="Nutri-Score" subtitle="Overall nutritional rating" />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-2">
        <div className="relative flex items-center justify-center">
          {style && (
            <motion.div
              aria-hidden
              className={cn("absolute size-36 rounded-full blur-2xl", style.glow)}
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.div
            initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 }}
            className={cn(
              "relative flex size-28 items-center justify-center rounded-[2rem] bg-gradient-to-br text-6xl font-bold uppercase text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_20px_40px_-12px_rgba(0,0,0,0.3)]",
              style ? style.badge : "from-zinc-200 to-zinc-300 text-zinc-500",
            )}
          >
            {grade ?? "?"}
          </motion.div>
        </div>

        <p className="text-center text-sm font-medium text-muted-foreground">
          {style ? style.label : "Nutri-Score not available"}
        </p>

        <div className="flex w-full items-end gap-1.5" role="img" aria-label={`Nutri-Score scale, grade ${grade?.toUpperCase() ?? "unknown"}`}>
          {GRADES.map((g) => {
            const active = g === grade
            return (
              <div key={g} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-full rounded-full transition-all duration-500",
                    STYLES[g].bar,
                    active ? "h-3 opacity-100" : "h-1.5 opacity-25",
                  )}
                />
                <span className={cn("text-[11px] font-semibold uppercase", active ? "text-foreground" : "text-muted-foreground/60")}>
                  {g}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </BentoCard>
  )
}
