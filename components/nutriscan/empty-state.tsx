"use client"

import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"

type EmptyStateProps = {
  title: string
  description: string
  onRetry: () => void
}

function ScannerIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="h-auto w-56 sm:w-64" role="img" aria-label="Barcode scanner with no match">
      <defs>
        <linearGradient id="es-beam" x1="0" x2="1">
          <stop offset="0" stopColor="#34d399" stopOpacity="0" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="es-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="es-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect x="40" y="30" width="120" height="100" rx="14" fill="#131316" stroke="#222228" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <rect
          key={i}
          x={58 + i * 6.6}
          y="50"
          width={i % 3 === 0 ? 3.5 : 2}
          height="56"
          rx="1"
          fill="#3f3f46"
          opacity={i % 4 === 1 ? 0.35 : 0.8}
        />
      ))}

      <g stroke="url(#es-frame)" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M30 42 V24 H48" />
        <path d="M152 24 H170 V42" />
        <path d="M170 118 V136 H152" />
        <path d="M48 136 H30 V118" />
      </g>

      <motion.g
        animate={{ y: [0, 56, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="34" y="50" width="132" height="6" fill="url(#es-beam)" filter="url(#es-glow)" />
        <rect x="34" y="52" width="132" height="1.5" fill="url(#es-beam)" />
      </motion.g>

      <circle cx="150" cy="122" r="14" fill="#09090b" stroke="#f87171" strokeOpacity="0.6" />
      <path d="M145 117 L155 127 M155 117 L145 127" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function EmptyState({ title, description, onRetry }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex max-w-xl flex-col items-center overflow-hidden rounded-3xl border border-[#222228] bg-[#131316] px-6 py-12 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
    >
      <div aria-hidden className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative">
        <ScannerIllustration />
      </div>
      <p className="relative mt-6 bg-gradient-to-b from-[#fafafa] to-[#fafafa]/20 bg-clip-text font-mono text-6xl font-bold tracking-tighter text-transparent sm:text-7xl">
        404
      </p>
      <p className="relative mt-1 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">Not Found</p>
      <h2 className="relative mt-5 text-xl font-semibold tracking-tight text-[#fafafa]">{title}</h2>
      <p className="relative mt-2 max-w-sm text-pretty text-sm leading-relaxed text-[#a1a1aa]">{description}</p>
      <button
        type="button"
        onClick={onRetry}
        className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#09090b] shadow-[0_0_30px_-6px_rgba(34,211,238,0.7)] outline-none transition-[transform,box-shadow] hover:shadow-[0_0_40px_-4px_rgba(34,211,238,0.9)] focus:ring-2 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-[#131316] active:scale-[0.98]"
      >
        <RotateCcw className="size-4" aria-hidden />
        Retry search
      </button>
    </motion.div>
  )
}
