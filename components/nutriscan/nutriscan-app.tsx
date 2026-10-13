"use client"

import { useState } from "react"
import useSWR from "swr"
import { AnimatePresence, motion } from "framer-motion"
import type { ProductResponse } from "@/lib/openfoodfacts"
import { SearchBar } from "./search-bar"
import { DashboardSkeleton } from "./dashboard-skeleton"
import { EmptyState } from "./empty-state"
import { ProductHeroCard } from "./product-hero-card"
import { NutriScoreCard } from "./nutri-score-card"
import { MacrosCard } from "./macros-card"
import { TagsCard } from "./tags-card"
import { IngredientsCard } from "./ingredients-card"

async function fetcher(url: string): Promise<ProductResponse> {
  const res = await fetch(url)
  const body = await res.json()
  if (!res.ok) throw new Error(body.error ?? "Something went wrong.")
  return body
}

export function NutriScanApp() {
  const [query, setQuery] = useState<string | null>(null)
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    query ? `/api/product?q=${encodeURIComponent(query)}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )

  const product = data?.product ?? null
  const hasSearched = query !== null
  const loading = isLoading || (isValidating && !product)

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#09090b]">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="mesh-drift absolute inset-0">
          <div className="absolute -top-64 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),rgba(100,116,139,0.06)_40%,transparent_70%)] blur-3xl" />
          <div className="absolute -top-32 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-emerald-400/[0.05] blur-[110px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
      </div>

      <header className="relative border-b border-[#222228]/60 bg-[#09090b]/40 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6" aria-label="Main">
          <button
            type="button"
            onClick={() => setQuery(null)}
            className="flex items-center gap-3 rounded-lg outline-none transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            <span className="text-base font-semibold tracking-tight text-[#fafafa]">
              <span aria-hidden className="mr-1.5">
                {"🌍"}
              </span>
              NutriScan <span className="text-[#a1a1aa]">DB</span>
            </span>
            <span className="relative rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-cyan-300 shadow-[0_0_16px_-2px_rgba(34,211,238,0.55)]">
              v2.0 Beta
            </span>
          </button>
          <span className="hidden items-center gap-2 text-xs text-[#a1a1aa] sm:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" aria-hidden />
            Live · Open Food Facts
          </span>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <motion.section
          layout
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={hasSearched ? "pb-10 pt-8" : "pb-16 pt-16 sm:pt-28"}
        >
          <AnimatePresence initial={false}>
            {!hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
                className="mb-10 text-center"
              >
                <h1 className="text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-[#fafafa]">
                  Know what you eat,{" "}
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    instantly.
                  </span>
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-pretty text-[clamp(1rem,1.6vw,1.125rem)] leading-relaxed text-[#a1a1aa]">
                  Scan a barcode or search any product to reveal its Nutri-Score, macros, allergens and additives.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <SearchBar onSearch={setQuery} isLoading={loading} />
        </motion.section>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DashboardSkeleton />
              </motion.div>
            ) : error ? (
              <motion.div key="error" exit={{ opacity: 0 }}>
                <EmptyState
                  title="Signal lost"
                  description={error.message}
                  onRetry={() => mutate()}
                />
              </motion.div>
            ) : hasSearched && data && !product ? (
              <motion.div key="empty" exit={{ opacity: 0 }}>
                <EmptyState
                  title="Product not found"
                  description={`We couldn't find "${query}" in Open Food Facts. Double-check the barcode or try a broader product name.`}
                  onRetry={() => mutate()}
                />
              </motion.div>
            ) : product ? (
              <motion.div
                key={product.code}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4"
              >
                <ProductHeroCard product={product} />
                <NutriScoreCard grade={product.nutriScore} />
                <MacrosCard macros={product.macros} />
                <div className="md:col-span-2 [&>section]:h-full">
                  <TagsCard allergens={product.allergens} labels={product.labels} />
                </div>
                <IngredientsCard ingredients={product.ingredients} additives={product.additives} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
