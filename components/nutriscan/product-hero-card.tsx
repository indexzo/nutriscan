"use client"

import Image from "next/image"
import { Package } from "lucide-react"
import type { Product } from "@/lib/openfoodfacts"
import { BentoCard } from "./bento-card"

function BarcodeStripes({ code }: { code: string }) {
  const bars = code.split("").flatMap((d, i) => {
    const n = Number(d)
    return [
      { w: (n % 3) + 1, key: `${i}-a` },
      { w: ((n + i) % 2) + 1, key: `${i}-b` },
    ]
  })
  return (
    <div aria-hidden className="flex h-8 items-stretch gap-[2px]">
      {bars.map((b, i) => (
        <span
          key={b.key}
          className={i % 2 === 0 ? "bg-foreground/80" : "bg-transparent"}
          style={{ width: b.w * 1.5 }}
        />
      ))}
    </div>
  )
}

export function ProductHeroCard({ product }: { product: Product }) {
  const { energyKcal } = product.macros

  return (
    <BentoCard index={0} className="p-0 sm:p-0 md:col-span-2 lg:col-span-3">
      <div className="flex flex-col md:flex-row">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted/40 md:aspect-auto md:w-80 md:shrink-0 lg:w-96">
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt=""
                fill
                aria-hidden
                sizes="400px"
                className="scale-150 object-cover opacity-70 blur-3xl saturate-150"
              />
              <div className="absolute inset-0 bg-white/30" aria-hidden />
              <div className="relative h-[78%] w-[70%]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, 70vw"
                  className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.25)] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Package className="size-10" aria-hidden />
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-8 p-6 sm:p-8">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {product.brand && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {product.brand}
                </span>
              )}
              {product.quantity && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {product.quantity}
                </span>
              )}
            </div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Barcode</p>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/30 px-4 py-3">
                <BarcodeStripes code={product.code.slice(0, 13)} />
                <span className="font-mono text-sm tracking-widest text-foreground">{product.code}</span>
              </div>
            </div>
            {energyKcal !== null && (
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Energy</p>
                <p className="text-3xl font-semibold tracking-tight text-foreground">
                  {Math.round(energyKcal)}
                  <span className="ml-1 text-base font-medium text-muted-foreground">kcal / 100g</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
