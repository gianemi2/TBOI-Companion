// components/ItemList.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent
} from "@/components/ui/collapsible"
import type { PoolFilter } from "@/constants/pools"
import { getCachedItems } from "@/lib/fetchItems"
import { cn } from "@/lib/utils"
import { Entity } from "@/types/entity"
import { filterItems } from "@/utils/filterItems"
import { SlidersHorizontal, X } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { EntityDialog } from "./EntityDialog"
import { EntityList } from "./EntityList"
import { PoolSelect } from "./PoolSelect"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { PageContainer } from "./ui/page-container"
import { SearchContainer } from "./ui/search-container"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

type Quality = 0 | 1 | 2 | 3 | 4

export function Items() {

    const [data] = useState(() => getCachedItems());

    if (!data)
        return;

    const { items, trinkets, consumables } = data;

    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [poolFilter, setPoolFilter] = useState<PoolFilter>("all")
    const [selectedItem, setSelectedItem] = useState<Entity | null>(null)
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)


    const [selectedQualities, setSelectedQualities] = useState<string[]>([])

    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput), 150);
        return () => clearTimeout(t);
    }, [searchInput]);

    const filtered = useMemo(() => {
        return {
            items: filterItems(items, search, poolFilter, "items", selectedQualities),
            trinkets: filterItems(trinkets, search, poolFilter, "trinkets"),
            consumables: filterItems(consumables, search, poolFilter, "consumables"),
        };
    }, [items, trinkets, consumables, search, poolFilter, selectedQualities]);

    const handleSelectItem = useCallback((entity: Entity | null) => {
        setSelectedItem(entity);
    }, []);

    const hasFilters = search.length > 0 || poolFilter !== "all" || selectedQualities.length > 0

    const resetFilters = () => {
        setSearchInput("")
        setSearch("")
        setPoolFilter("all")
        setSelectedQualities([])
    }

    return (
        <>
            <PageContainer>
                <div className="flex flex-col sticky top-0 bg-accent/90 z-10 -m-4 mb-4 p-4">
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
                            onClick={() => setShowAdvancedFilters(v => !v)}
                            title="Filtri avanzati"
                            className={cn(showAdvancedFilters && "bg-input/40")}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                        </Button>

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

                    {
                        showAdvancedFilters && (
                            <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                                <CollapsibleContent>
                                    <div className="mt-2">

                                        <ToggleGroup
                                            type="multiple"
                                            variant="outline"
                                            value={selectedQualities}
                                            onValueChange={setSelectedQualities}
                                            className="flex flex-wrap"
                                        >
                                            {[0, 1, 2, 3, 4].map(q => (
                                                <ToggleGroupItem
                                                    key={q}
                                                    value={q.toString()}
                                                    className="
                            px-3 py-1 text-sm
                            data-[state=on]:bg-input/30
                            data-[state=on]:text-white
                        "
                                                >
                                                    {q}
                                                </ToggleGroupItem>
                                            ))}
                                        </ToggleGroup>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        )
                    }
                </div>

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
            </PageContainer >

            <EntityDialog
                entity={selectedItem}
                onClose={handleSelectItem}
            />
        </>
    )
}
