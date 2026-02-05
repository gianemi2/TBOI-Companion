import type { Item } from "@/types/item"
import { MilestoneSection } from "@/types/milestones"
import { MiscGroup } from "@/types/misc"

type CachedItemProps = {
    trinkets: Item[]
    items: Item[]
    consumables: Item[]
    milestones: MilestoneSection[],
    misc: MiscGroup[]
}

let cachedItems: CachedItemProps | null = null

async function fetchData(type: "trinkets" | "items" | "consumables" | "milestones" | "misc") {
    const res = await fetch(`/data/${type}.json`)
    if (!res.ok) {
        throw new Error(`Errore nel caricamento ${type}.json`)
    }
    return res.json()
}

export async function fetchItems(): Promise<CachedItemProps> {
    if (cachedItems) return cachedItems

    const response: CachedItemProps = {
        trinkets: await fetchData("trinkets"),
        items: await fetchData("items"),
        consumables: await fetchData("consumables"),
        milestones: await fetchData("milestones"),
        misc: await fetchData("misc")
    }

    cachedItems = response
    return response
}

export function getCachedItems() {
    return cachedItems
}
