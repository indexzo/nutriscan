"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"
import type { NutriGrade } from "@/lib/openfoodfacts"
import { cn } from "@/lib/utils"
import { BentoCard, CardHeader } from "./bento-card"

const GRADES: NutriGrade[] = ["a", "b", "c", "d", "e"]

const STYLES: Record<NutriGrade, { badge: string; hex: string; label: string }> = {
  a: { badge: "from-emerald-400 to-green-600", hex: "#22c55e", label: "Excellent nutritional quality" },
  b: { badge: "from-lime-300 to-lime-500", hex: "#84cc16", label: "Good nutritional quality" },
  c: { badge: "from-yellow-300 to-amber-400", hex: "#facc15", label: "Average nutritional quality" },
  d: { badge: "from-orange-400 to-orange-600", hex: "#f97316", label: "Poor nutritional quality" },
  e: { badge: "from-red-400 to-rose-600", hex: "#ef4444", label: "Bad nutritional quality" },
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
              className="absolute size-40 rounded-full blur-3xl"
              style={{ backgroundColor: `${style.hex}55` }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.div
            initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 }}
            className={cn(
              "relative flex size-28 items-center justify-center rounded-[2rem] bg-gradient-to-br text-6xl font-bold uppercase",
              style ? `${style.badge} text-white` : "from-zinc-800 to-zinc-900 text-zinc-500",
            )}
            style={
              style
                ? {
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.45), 0 0 40px -4px ${style.hex}cc, 0 0 90px -10px ${style.hex}88`,
                    textShadow: `0 0 18px rgba(255,255,255,0.7), 0 2px 8px rgba(0,0,0,0.35)`,
                  }
                : undefined
            }
          >
            {grade ?? "?"}
          </motion.div>
        </div>

        <p className="text-center text-sm font-medium text-zinc-400">
          {style ? style.label : "Nutri-Score not available"}
        </p>

        <div
          className="flex w-full items-end gap-1.5"
          role="img"
          aria-label={`Nutri-Score scale, grade ${grade?.toUpperCase() ?? "unknown"}`}
        >
          {GRADES.map((g) => {
            const active = g === grade
            const hex = STYLES[g].hex
            return (
              <div key={g} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={cn("w-full rounded-full transition-all duration-500", active ? "h-3" : "h-1.5 opacity-30")}
                  style={{
                    backgroundColor: hex,
                    boxShadow: active ? `0 0 16px ${hex}, 0 0 4px ${hex}` : undefined,
                  }}
                />
                <span
                  className={cn("text-[11px] font-semibold uppercase", active ? "" : "text-zinc-600")}
                  style={active ? { color: hex, textShadow: `0 0 10px ${hex}` } : undefined}
                >
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
