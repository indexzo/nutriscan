import { NextResponse, type NextRequest } from "next/server"
import { isBarcode, normalizeProduct, type ProductResponse } from "@/lib/openfoodfacts"

const OFF_HEADERS = {
  "User-Agent": "NutriScanDB/1.0 (https://github.com/indexzo/nutriscan)",
  Accept: "application/json",
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? ""

  if (!query || query.length > 120) {
    return NextResponse.json({ error: "Please provide a valid search query." }, { status: 400 })
  }

  const url = isBarcode(query)
    ? `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(query)}.json`
    : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query,
      )}&search_simple=1&action=process&json=1&page_size=1`

  try {
    const res = await fetch(url, { headers: OFF_HEADERS })

    if (res.status === 404) {
      return NextResponse.json<ProductResponse>({ product: null })
    }
    if (!res.ok) {
      return NextResponse.json({ error: "Open Food Facts is unavailable right now." }, { status: 502 })
    }

    const data = await res.json()
    const raw = isBarcode(query)
      ? data.status === 1 || data.product
        ? data.product
        : null
      : data.products?.[0] ?? null

    return NextResponse.json<ProductResponse>({ product: raw ? normalizeProduct(raw) : null })
  } catch {
    return NextResponse.json({ error: "Could not reach Open Food Facts." }, { status: 502 })
  }
}
