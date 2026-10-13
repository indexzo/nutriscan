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
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_40px_-16px_rgba(16,24,40,0.12)] transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_60px_-20px_rgba(16,24,40,0.22)] sm:p-7",
        className,
      )}
    >
      {children}
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
            "flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 text-emerald-600",
            accent,
          )}
        >
          <Icon className="size-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
