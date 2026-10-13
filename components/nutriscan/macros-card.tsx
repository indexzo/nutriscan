"use client"

import { PieChart as PieIcon } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, type TooltipContentProps } from "recharts"
import type { Product } from "@/lib/openfoodfacts"
import { BentoCard, CardHeader } from "./bento-card"

const TRACK_COLOR = "#1c1c21"

const MACROS = [
  { key: "proteins", label: "Protein", color: "#34f5c5" },
  { key: "carbohydrates", label: "Carbs", color: "#38bdf8" },
  { key: "fat", label: "Fat", color: "#f472d0" },
] as const

type Slice = { name: string; value: number; color: string }

function MacroTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload as Slice
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span
          className="size-2.5 rounded-full"
          style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
          aria-hidden
        />
        <span className="text-xs font-medium text-zinc-400">{item.name}</span>
      </div>
      <p className="mt-1 text-lg font-semibold tracking-tight text-white">
        {item.value.toFixed(1)}
        <span className="ml-0.5 text-xs font-medium text-zinc-400">g / 100g</span>
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
        <div aria-hidden className="absolute inset-[18%] rounded-full bg-emerald-300/5 blur-2xl" />
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ value: 1 }]}
              dataKey="value"
              innerRadius="68%"
              outerRadius="96%"
              fill={TRACK_COLOR}
              stroke="none"
              isAnimationActive={false}
            />
            {hasData && (
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="72%"
                outerRadius="92%"
                paddingAngle={6}
                cornerRadius={12}
                stroke="none"
                startAngle={90}
                endAngle={-270}
                animationDuration={900}
              >
                {data.map((d) => (
                  <Cell
                    key={d.name}
                    fill={d.color}
                    className="outline-none transition-opacity hover:opacity-80"
                    style={{ filter: `drop-shadow(0 0 6px ${d.color}aa)` }}
                  />
                ))}
              </Pie>
            )}
            {hasData && <Tooltip content={MacroTooltip} cursor={false} wrapperStyle={{ outline: "none", zIndex: 10 }} />}
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tracking-tight text-white">{total.toFixed(0)}g</span>
          <span className="text-xs text-zinc-400">total macros</span>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-2">
        {MACROS.map((m) => {
          const value = macros[m.key]
          const pct = hasData ? Math.round((value / total) * 100) : 0
          return (
            <li
              key={m.key}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-3 py-2.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-zinc-700"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: m.color, boxShadow: `0 0 8px ${m.color}` }}
                  aria-hidden
                />
                <span className="text-[11px] font-medium text-zinc-400">{m.label}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-white">
                {value.toFixed(1)}g <span className="font-normal text-zinc-500">· {pct}%</span>
              </p>
            </li>
          )
        })}
      </ul>
    </BentoCard>
  )
}
