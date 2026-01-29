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
import { cn } from "@/lib/utils"
import { SearchContainer } from "./ui/search-container"
import { PageContainer } from "./ui/page-container"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"

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
        setSearchInput("")
        setSearch("")
        setPoolFilter("all")
    }

    return (
        <>
            <PageContainer>
                <SearchContainer>
                    <InputGroup>
                        <InputGroupInput placeholder="Cerca ovunque..."
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            className="w-auto" />
                        {
                            searchInput !== "" && (
                                <InputGroupAddon className="cursor-pointer" align="inline-end" onClick={() => {
                                    setSearchInput('')
                                    setSearch('')
                                }}>
                                    <X />
                                </InputGroupAddon>
                            )
                        }
                    </InputGroup>

                    <PoolSelect
                        value={poolFilter}
                        onChange={setPoolFilter}
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetFilters}
                        title="Reset filtri"
                        className={cn(!hasFilters && "opacity-0")}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </SearchContainer>

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
            </PageContainer>

            <ItemDialog
                item={selectedItem}
                onClose={handleSelectItem}
            />
        </>
    )
}
