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
      className="relative mx-auto flex max-w-xl flex-col items-center overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 px-6 py-12 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),inset_0_0_60px_-20px_rgba(255,255,255,0.06)] backdrop-blur-2xl"
    >
      <div aria-hidden className="absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative size-48 [mask-image:radial-gradient(circle,black_45%,transparent_72%)] sm:size-56"
      >
        <Image src="/images/empty-state.png" alt="" fill sizes="224px" className="object-contain opacity-90" />
      </motion.div>
      <h2 className="relative mt-6 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="relative mt-2 max-w-sm text-pretty text-sm leading-relaxed text-zinc-400">{description}</p>
    </motion.div>
  )
}
