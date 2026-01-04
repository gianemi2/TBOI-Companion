// components/ItemList.tsx
"use client"

import { useMemo, useState } from "react"
import type { Item } from "@/types/item"
import { ItemCard } from "./ItemCard"
import { ItemDialog } from "./ItemDialog"
import { Input } from "@/components/ui/input"
import { PoolSelect } from "./PoolSelect"
import { filterItems } from "@/utils/filterItems"
import type { PoolFilter } from "@/constants/pools"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ItemList } from "./ItemList"
import { getCachedItems } from "@/lib/fetchItems"

export function Items() {

    const data = getCachedItems();

    if (!data)
        return;

    const { items, trinkets, consumables } = data;

    const [search, setSearch] = useState("")
    const [poolFilter, setPoolFilter] = useState<PoolFilter>("all")
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)

    const filteredItems = useMemo(
        () => filterItems(items, search, poolFilter, "items"),
        [items, search, poolFilter]
    )

    const filteredTrinkets = useMemo(
        () => filterItems(trinkets, search, poolFilter, "trinkets"),
        [items, search]
    )

    const filteredConsumables = useMemo(
        () => filterItems(consumables, search, poolFilter, "consumables"),
        [items, search]
    )

    const hasFilters = search.length > 0 || poolFilter !== "all"

    const resetFilters = () => {
        setSearch("")
        setPoolFilter("all")
    }

    return (
        <>
            <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-2 items-center sticky top-0 bg-[#0D0A09] z-10 -m-4 mb-4 p-4">
                    <Input
                        placeholder="Cerca ovunque..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="max-w-xs"
                    />

                    <PoolSelect
                        value={poolFilter}
                        onChange={setPoolFilter}
                    />

                    {hasFilters && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={resetFilters}
                            title="Reset filtri"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                <ItemList
                    items={filteredItems}
                    title="Items"
                    onSelectItem={(item) => setSelectedItem(item)}
                />

                <ItemList
                    items={filteredTrinkets}
                    title="Trinkets"
                    onSelectItem={(item) => setSelectedItem(item)}
                />

                <ItemList
                    items={filteredConsumables}
                    title="Consumables"
                    onSelectItem={(item) => setSelectedItem(item)}
                />
            </div>

            <ItemDialog
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </>
    )
}
