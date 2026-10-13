"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type BentoCardProps = {
  children: ReactNode
  className?: string
  index?: number
}

export function BentoCard({ children, className, index = 0 }: BentoCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 260, damping: 24, mass: 0.8 } }}
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-2xl sm:p-7",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),inset_0_0_60px_-20px_rgba(255,255,255,0.06),0_0_0_0_rgba(0,0,0,0)]",
        "transition-[box-shadow,border-color] duration-700 ease-out",
        "hover:border-zinc-700/80 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),inset_0_0_60px_-20px_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.9),0_0_60px_-30px_rgba(52,245,197,0.25)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-emerald-300/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover/card:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </motion.section>
  )
}

type CardHeaderProps = {
  icon: LucideIcon
  title: string
  subtitle?: string
  accent?: string
  action?: ReactNode
}

export function CardHeader({ icon: Icon, title, subtitle, accent, action }: CardHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300 shadow-[0_0_20px_-6px_rgba(52,245,197,0.6)]",
            accent,
          )}
        >
          <Icon className="size-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white">{title}</h2>
          {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
