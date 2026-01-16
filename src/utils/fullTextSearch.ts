// utils/fullTextSearch.ts
import type { Item } from "@/types/item"

export function matchesSearch(item: Item, query: string): boolean {
    if (!query) return true

    const q = query.toLowerCase()

    if (q === "passive" || q === "active")
        return (typeof item.type === "string" && item.type.toLowerCase().includes(q))

    return Object.values(item).some(value =>
        typeof value === "string" &&
        value.toLowerCase().includes(q)
    )
}
