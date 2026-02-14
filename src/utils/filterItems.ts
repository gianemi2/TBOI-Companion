// utils/filterItems.ts
import type { PoolFilter } from "@/constants/pools"
import type { Item } from "@/types/item"
import { UnlockFilterMode } from "@/types/unlockFilterMode"
import { matchesSearch } from "./fullTextSearch"

type ItemsType = "items" | "trinkets" | "consumables"

export function filterItems(
    items: Item[],
    search: string,
    poolFilter: PoolFilter,
    itemType: ItemsType,
    qualityFilter: string[] = [],
    unlockMode: UnlockFilterMode,
    unlockedItems: Set<number>
): Item[] {
    const poolQ = poolFilter.toLowerCase()

    return items.filter(item => {
        const searchOk = matchesSearch(item, search)

        if (itemType !== "items")
            return searchOk

        const poolOk =
            poolFilter === "all" ||
            (item.pool && item.pool.toLowerCase().includes(poolQ))

        const qualityOk =
            qualityFilter.length === 0 ||
            (
                typeof item.quality === "number" &&
                qualityFilter.includes(item.quality.toString())
            )

        let unlockOk = true

        const isUnlocked = !item.unlock || unlockedItems.has(item.index)

        switch (unlockMode) {
            case "all":
            case "dim-locked":
                unlockOk = true
                break

            case "unlocked-only":
                unlockOk = isUnlocked
                break

            case "locked-only":
                unlockOk = !isUnlocked
                break
        }



        return searchOk && poolOk && qualityOk && unlockOk
    })
}
