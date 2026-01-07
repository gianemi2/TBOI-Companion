// components/ItemList.tsx
"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
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

    const [data] = useState(() => getCachedItems());

    if (!data)
        return;

    const { items, trinkets, consumables } = data;

    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [poolFilter, setPoolFilter] = useState<PoolFilter>("all")
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)

    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput), 150);
        return () => clearTimeout(t);
    }, [searchInput]);

    const filtered = useMemo(() => {
        return {
            items: filterItems(items, search, poolFilter, "items"),
            trinkets: filterItems(trinkets, search, poolFilter, "trinkets"),
            consumables: filterItems(consumables, search, poolFilter, "consumables"),
        };
    }, [items, trinkets, consumables, search, poolFilter]);

    const handleSelectItem = useCallback((item: Item | null) => {
        setSelectedItem(item);
    }, []);

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
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
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
                    items={filtered.items}
                    title="Items"
                    onSelectItem={handleSelectItem}
                />

                <ItemList
                    items={filtered.trinkets}
                    title="Trinkets"
                    onSelectItem={handleSelectItem}
                />

                <ItemList
                    items={filtered.consumables}
                    title="Consumables"
                    onSelectItem={handleSelectItem}
                />
            </div>

            <ItemDialog
                item={selectedItem}
                onClose={handleSelectItem}
            />
        </>
    )
}
