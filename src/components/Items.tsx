// components/ItemList.tsx
"use client"

import { Button } from "@/components/ui/button"
import type { PoolFilter } from "@/constants/pools"
import { getCachedItems } from "@/lib/fetchItems"
import { cn } from "@/lib/utils"
import { Entity } from "@/types/entity"
import { filterItems } from "@/utils/filterItems"
import { X } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { EntityDialog } from "./EntityDialog"
import { EntityList } from "./EntityList"
import { PoolSelect } from "./PoolSelect"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { PageContainer } from "./ui/page-container"
import { SearchContainer } from "./ui/search-container"

export function Items() {

    const [data] = useState(() => getCachedItems());

    if (!data)
        return;

    const { items, trinkets, consumables } = data;

    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [poolFilter, setPoolFilter] = useState<PoolFilter>("all")
    const [selectedItem, setSelectedItem] = useState<Entity | null>(null)

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

    const handleSelectItem = useCallback((entity: Entity | null) => {
        setSelectedItem(entity);
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

                <EntityList
                    entities={filtered.items}
                    title="Items"
                    onSelectItem={handleSelectItem}
                />

                <EntityList
                    entities={filtered.trinkets}
                    title="Trinkets"
                    onSelectItem={handleSelectItem}
                />

                <EntityList
                    entities={filtered.consumables}
                    title="Consumables"
                    onSelectItem={handleSelectItem}
                />
            </PageContainer>

            <EntityDialog
                entity={selectedItem}
                onClose={handleSelectItem}
            />
        </>
    )
}
