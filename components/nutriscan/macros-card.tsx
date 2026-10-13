"use client"

import { PieChart as PieIcon } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, type TooltipContentProps } from "recharts"
import type { Product } from "@/lib/openfoodfacts"
import { BentoCard, CardHeader } from "./bento-card"

const MACROS = [
  { key: "proteins", label: "Protein", color: "#10b981", soft: "bg-emerald-50", dot: "bg-emerald-500" },
  { key: "carbohydrates", label: "Carbs", color: "#0ea5e9", soft: "bg-sky-50", dot: "bg-sky-500" },
  { key: "fat", label: "Fat", color: "#f59e0b", soft: "bg-amber-50", dot: "bg-amber-500" },
] as const

type Slice = { name: string; value: number; color: string }

function MacroTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload as Slice
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden />
        <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
      </div>
      <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">
        {item.value.toFixed(1)}
        <span className="ml-0.5 text-xs font-medium text-muted-foreground">g / 100g</span>
      </p>
    </div>
  )
}

export function MacrosCard({ macros }: { macros: Product["macros"] }) {
  const data: Slice[] = MACROS.map((m) => ({ name: m.label, value: macros[m.key], color: m.color }))
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const hasData = total > 0

  return (
    <BentoCard index={2} className="flex flex-col">
      <CardHeader icon={PieIcon} title="Macronutrients" subtitle="Per 100g" />

      <div className="relative mx-auto aspect-square w-full max-w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={hasData ? data : [{ name: "None", value: 1, color: "#e5e7eb" }]}
              dataKey="value"
              nameKey="name"
              innerRadius="68%"
              outerRadius="96%"
              paddingAngle={hasData ? 5 : 0}
              cornerRadius={12}
              stroke="none"
              startAngle={90}
              endAngle={-270}
              animationDuration={900}
            >
              {(hasData ? data : [{ color: "#e5e7eb" }]).map((d, i) => (
                <Cell key={i} fill={d.color} className="outline-none transition-opacity hover:opacity-80" />
              ))}
            </Pie>
            {hasData && <Tooltip content={MacroTooltip} cursor={false} wrapperStyle={{ outline: "none", zIndex: 10 }} />}
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tracking-tight text-foreground">{total.toFixed(0)}g</span>
          <span className="text-xs text-muted-foreground">total macros</span>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-2">
        {MACROS.map((m) => {
          const value = macros[m.key]
          const pct = hasData ? Math.round((value / total) * 100) : 0
          return (
            <li key={m.key} className={`rounded-2xl ${m.soft} px-3 py-2.5 transition-transform duration-300 hover:-translate-y-0.5`}>
              <div className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${m.dot}`} aria-hidden />
                <span className="text-[11px] font-medium text-muted-foreground">{m.label}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {value.toFixed(1)}g <span className="font-normal text-muted-foreground">· {pct}%</span>
              </p>
            </li>
          )
        })}
      </ul>
    </BentoCard>
  )
}
