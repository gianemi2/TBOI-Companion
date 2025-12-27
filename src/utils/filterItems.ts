// utils/filterItems.ts
import type { Item } from "@/types/item"
import type { PoolFilter } from "@/constants/pools"
import { matchesSearch } from "./fullTextSearch"

export function filterItems(
    items: Item[],
    search: string,
    poolFilter: PoolFilter
): Item[] {
    const poolQ = poolFilter.toLowerCase()

    return items.filter(item => {
        const searchOk = matchesSearch(item, search)

        const poolOk =
            poolFilter === "all" ||
            (item.pool && item.pool?.toLowerCase().includes(poolQ))

        return searchOk && poolOk
    })
}
