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
          className={i % 2 === 0 ? "bg-zinc-200" : "bg-transparent"}
          style={{ width: b.w * 1.5 }}
        />
      ))}
    </div>
  )
}

const FADE_MASK =
  "[mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:[mask-image:linear-gradient(to_right,black_50%,transparent)]"

export function ProductHeroCard({ product }: { product: Product }) {
  const { energyKcal } = product.macros

  return (
    <BentoCard index={0} className="p-0 sm:p-0 md:col-span-2 lg:col-span-3">
      <div className="flex flex-col md:flex-row">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden md:aspect-auto md:min-h-72 md:w-80 md:shrink-0 lg:w-[26rem]">
          {product.image ? (
            <div className={`absolute inset-0 flex items-center justify-center ${FADE_MASK}`}>
              <Image
                src={product.image}
                alt=""
                fill
                aria-hidden
                sizes="420px"
                className="scale-150 object-cover opacity-40 blur-3xl saturate-150"
              />
              <div className="relative h-[82%] w-[74%] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_78%)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, 70vw"
                  className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out group-hover/card:scale-105"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <Package className="size-10" aria-hidden />
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-8 p-6 sm:p-8">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {product.brand && (
                <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  {product.brand}
                </span>
              )}
              {product.quantity && (
                <span className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-400">
                  {product.quantity}
                </span>
              )}
            </div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Barcode</p>
              <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 py-3">
                <BarcodeStripes code={product.code.slice(0, 13)} />
                <span className="font-mono text-sm tracking-widest text-zinc-200">{product.code}</span>
              </div>
            </div>
            {energyKcal !== null && (
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Energy</p>
                <p className="text-3xl font-semibold tracking-tight text-white">
                  {Math.round(energyKcal)}
                  <span className="ml-1 text-base font-medium text-zinc-400">kcal / 100g</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
