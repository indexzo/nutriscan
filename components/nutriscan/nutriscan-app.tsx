"use client"

import { useState } from "react"
import useSWR from "swr"
import { AnimatePresence, motion } from "framer-motion"
import { Activity } from "lucide-react"
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
  const { data, error, isLoading } = useSWR(
    query ? `/api/product?q=${encodeURIComponent(query)}` : null,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )

  const product = data?.product ?? null
  const hasSearched = query !== null

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-200/50 via-sky-200/40 to-violet-200/30 blur-3xl" />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.8)]">
            <Activity className="size-4" aria-hidden />
          </div>
          <span className="text-base font-semibold tracking-tight">
            NutriScan <span className="text-muted-foreground">DB</span>
          </span>
        </div>
        <span className="hidden rounded-full border border-border bg-white/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur sm:inline">
          Powered by Open Food Facts
        </span>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <motion.section
          layout
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={hasSearched ? "pb-12 pt-6" : "pb-16 pt-16 sm:pt-28"}
        >
          <AnimatePresence initial={false}>
            {!hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
                className="mb-10 text-center"
              >
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1 text-xs font-medium text-emerald-700 backdrop-blur">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />
                  3M+ products indexed
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                  Know what you eat,{" "}
                  <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                    instantly.
                  </span>
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Scan a barcode or search any product to reveal its Nutri-Score, macros, allergens and additives.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <SearchBar onSearch={setQuery} isLoading={isLoading} />
        </motion.section>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DashboardSkeleton />
              </motion.div>
            ) : error ? (
              <motion.div key="error" exit={{ opacity: 0 }}>
                <EmptyState title="Something went sideways" description={error.message} />
              </motion.div>
            ) : hasSearched && data && !product ? (
              <motion.div key="empty" exit={{ opacity: 0 }}>
                <EmptyState
                  title="Product not found"
                  description={`We couldn't find "${query}" in Open Food Facts. Double-check the barcode or try a broader product name.`}
                />
              </motion.div>
            ) : product ? (
              <motion.div
                key={product.code}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                <ProductHeroCard product={product} />
                <NutriScoreCard grade={product.nutriScore} />
                <MacrosCard macros={product.macros} />
                <div className="md:col-span-2 lg:col-span-1 [&>section]:h-full">
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
