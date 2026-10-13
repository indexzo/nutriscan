export type NutriGrade = "a" | "b" | "c" | "d" | "e"

export type Product = {
  code: string
  name: string
  brand: string | null
  quantity: string | null
  image: string | null
  nutriScore: NutriGrade | null
  macros: {
    proteins: number
    carbohydrates: number
    fat: number
    sugars: number | null
    fiber: number | null
    energyKcal: number | null
  }
  allergens: string[]
  labels: string[]
  ingredients: string | null
  additives: string[]
}

export type ProductResponse = { product: Product | null }

type RawProduct = {
  code?: string
  _id?: string
  product_name?: string
  product_name_en?: string
  generic_name?: string
  brands?: string
  quantity?: string
  image_front_url?: string
  image_url?: string
  nutriscore_grade?: string
  nutrition_grades?: string
  nutriments?: Record<string, number | string | undefined>
  allergens_tags?: string[]
  labels_tags?: string[]
  ingredients_text?: string
  ingredients_text_en?: string
  additives_tags?: string[]
}

const LANG_PREFIX = /^[a-z]{2,3}:/i

export function stripLangPrefix(tag: string) {
  return tag.replace(LANG_PREFIX, "")
}

function humanizeTag(tag: string) {
  const clean = stripLangPrefix(tag).replace(/[-_]+/g, " ").trim()
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}

function toNumber(value: number | string | undefined) {
  if (value === undefined || value === "") return null
  const n = typeof value === "number" ? value : Number.parseFloat(value)
  return Number.isFinite(n) ? n : null
}

function uniq(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)))
}

export function normalizeProduct(raw: RawProduct): Product {
  const n = raw.nutriments ?? {}
  const grade = (raw.nutriscore_grade ?? raw.nutrition_grades ?? "").toLowerCase()

  return {
    code: raw.code ?? raw._id ?? "",
    name: raw.product_name_en || raw.product_name || raw.generic_name || "Unnamed product",
    brand: raw.brands?.split(",")[0]?.trim() || null,
    quantity: raw.quantity?.trim() || null,
    image: raw.image_front_url || raw.image_url || null,
    nutriScore: ["a", "b", "c", "d", "e"].includes(grade) ? (grade as NutriGrade) : null,
    macros: {
      proteins: toNumber(n.proteins_100g) ?? 0,
      carbohydrates: toNumber(n.carbohydrates_100g) ?? 0,
      fat: toNumber(n.fat_100g) ?? 0,
      sugars: toNumber(n.sugars_100g),
      fiber: toNumber(n.fiber_100g),
      energyKcal: toNumber(n["energy-kcal_100g"]),
    },
    allergens: uniq((raw.allergens_tags ?? []).map(humanizeTag)),
    labels: uniq((raw.labels_tags ?? []).map(humanizeTag)),
    ingredients: (raw.ingredients_text_en || raw.ingredients_text || "").trim() || null,
    additives: uniq((raw.additives_tags ?? []).map((t) => stripLangPrefix(t).toUpperCase())),
  }
}

export function isBarcode(query: string) {
  return /^\d+$/.test(query.trim())
}
