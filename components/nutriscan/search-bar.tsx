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
      <form onSubmit={handleSubmit} role="search" className="relative">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-emerald-300/40 via-sky-300/40 to-violet-300/40 blur-3xl transition-opacity duration-700",
            focused ? "opacity-100" : "opacity-50",
          )}
        />
        <div className="relative rounded-[1.75rem] p-[1.5px] shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)]">
          <div
            aria-hidden
            className={cn(
              "gradient-ring absolute inset-0 rounded-[1.75rem] transition-opacity duration-500",
              focused ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-[1.75rem] bg-border transition-opacity duration-500",
              focused ? "opacity-0" : "opacity-100",
            )}
          />
          <div className="relative flex items-center gap-2 rounded-[calc(1.75rem-1.5px)] bg-white/90 p-2 backdrop-blur-xl sm:gap-3 sm:p-2.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 text-emerald-600 sm:size-12">
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
              className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70 sm:text-lg"
            />
            <motion.button
              type="submit"
              disabled={isLoading || !value.trim()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500 px-4 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.8)] outline-none transition-shadow hover:shadow-[0_14px_40px_-10px_rgba(16,185,129,0.9)] focus-visible:ring-4 focus-visible:ring-emerald-300/60 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:px-6"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
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
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-muted-foreground">Try</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.query}
            type="button"
            onClick={() => runSuggestion(s.query)}
            className="rounded-full border border-border bg-white/70 px-3 py-1 text-foreground/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:text-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(16,185,129,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
