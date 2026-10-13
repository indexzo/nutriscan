"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-black/[0.06] bg-white/80 px-6 py-12 text-center shadow-[0_12px_40px_-16px_rgba(16,24,40,0.12)] backdrop-blur-xl"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative size-48 sm:size-56"
      >
        <Image src="/images/empty-state.png" alt="" fill sizes="224px" className="object-contain" />
      </motion.div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.div>
  )
}
