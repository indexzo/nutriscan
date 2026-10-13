"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, ScanBarcode, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  { label: "Nutella", query: "3017620422003" },
  { label: "Greek yogurt", query: "greek yogurt" },
  { label: "Oat milk", query: "oat milk" },
  { label: "Coca-Cola", query: "5449000000996" },
]

type SearchBarProps = {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (q) onSearch(q)
  }

  function runSuggestion(query: string) {
    setValue(query)
    onSearch(query)
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <motion.form
        onSubmit={handleSubmit}
        role="search"
        className="relative"
        animate={{ y: focused ? -2 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-400/20 via-cyan-400/15 to-emerald-400/20 blur-3xl transition-opacity duration-700",
            focused ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="relative rounded-full p-px shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <div
            aria-hidden
            className={cn(
              "gradient-ring absolute inset-0 rounded-full transition-opacity duration-500",
              focused ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-500",
              focused ? "opacity-0" : "opacity-100",
            )}
          />
          <div className="relative flex items-center gap-2 rounded-full bg-zinc-950/90 p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:gap-3 sm:p-2">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-500 sm:size-12",
                focused ? "bg-emerald-300/10 text-emerald-300" : "bg-zinc-900 text-zinc-500",
              )}
            >
              <Search className="size-5" aria-hidden />
            </div>
            <label htmlFor="product-search" className="sr-only">
              Scan barcode or search product
            </label>
            <input
              id="product-search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Scan barcode or search product..."
              autoComplete="off"
              enterKeyHint="search"
              maxLength={120}
              className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-zinc-500 sm:text-lg"
            />
            <motion.button
              type="submit"
              disabled={isLoading || !value.trim()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-full bg-emerald-300 px-4 text-sm font-semibold text-zinc-950 shadow-[0_0_30px_-6px_rgba(52,245,197,0.8)] outline-none transition-shadow hover:shadow-[0_0_44px_-4px_rgba(52,245,197,0.95)] focus-visible:ring-4 focus-visible:ring-emerald-300/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:h-12 sm:px-6"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <ScanBarcode className="size-4" aria-hidden />
              )}
              <span className="hidden sm:inline">{isLoading ? "Scanning" : "Scan"}</span>
              <span className="sr-only sm:hidden">Search</span>
              <ArrowRight
                className="hidden size-4 transition-transform group-hover:translate-x-0.5 sm:block"
                aria-hidden
              />
            </motion.button>
          </div>
        </div>
      </motion.form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-zinc-500">Try</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.query}
            type="button"
            onClick={() => runSuggestion(s.query)}
            className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-zinc-300 backdrop-blur transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:text-emerald-300 hover:shadow-[0_0_20px_-6px_rgba(52,245,197,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
