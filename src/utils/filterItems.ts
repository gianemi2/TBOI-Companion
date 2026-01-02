// utils/filterItems.ts
import type { Item } from "@/types/item"
import type { PoolFilter } from "@/constants/pools"
import { matchesSearch } from "./fullTextSearch"

type ItemsType = "items" | "trinkets" | "consumables"

export function filterItems(
    items: Item[],
    search: string,
    poolFilter: PoolFilter,
    itemType: ItemsType
): Item[] {
    const poolQ = poolFilter.toLowerCase()

    return items.filter(item => {
        const searchOk = matchesSearch(item, search)

        if (itemType !== "items")
            return searchOk;

        const poolOk =
            poolFilter === "all" ||
            (item.pool && item.pool?.toLowerCase().includes(poolQ))

        return searchOk && poolOk
    })
}
