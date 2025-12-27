// components/ItemList.tsx
"use client"

import { useMemo, useState } from "react"
import itemsData from "@/data/items.json"
import type { Item } from "@/types/item"
import { ItemCard } from "./ItemCard"
import { ItemDialog } from "./ItemDialog"
import { Input } from "@/components/ui/input"
import { PoolSelect } from "./PoolSelect"
import { filterItems } from "@/utils/filterItems"
import type { PoolFilter } from "@/constants/pools"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function ItemList() {
    const items = itemsData as Item[]

    const [search, setSearch] = useState("")
    const [poolFilter, setPoolFilter] = useState<PoolFilter>("all")
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)

    const filteredItems = useMemo(
        () => filterItems(items, search, poolFilter),
        [items, search, poolFilter]
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

                <div className="flex flex-wrap">
                    {filteredItems.map(item => (
                        <ItemCard
                            key={item.index}
                            item={item}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}
                </div>
            </div>

            <ItemDialog
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </>
    )
}
