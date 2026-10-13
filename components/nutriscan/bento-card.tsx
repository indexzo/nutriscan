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
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border border-[#222228] bg-[#131316] p-6 backdrop-blur-xl sm:p-7",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        "transition-[translate,border-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_24px_60px_-28px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-cyan-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100"
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
          <h2 className="text-sm font-semibold tracking-tight text-[#fafafa]">{title}</h2>
          {subtitle && <p className="text-xs text-[#a1a1aa]">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
