import { Button } from "@/components/ui/button"
import { ALL_PICKUPS } from "@/constants/Pickups"
import { cn } from "@/lib/utils"
import { Entity } from "@/types/entity"
import { Pickup } from "@/types/pickup"
import { CainRecipe } from "@/types/recipe"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { ItemSelect } from "./ItemSelect"
import { PickupGrid } from "./PickupGrid"
import { PickupPickerBar } from "./PickupPickerBar"


interface Props {
    recipe: CainRecipe
    items: Entity[]
    onChange: (patch: Partial<CainRecipe>) => void
    onDelete: () => void
}

export function RecipeCard({
    recipe,
    items,
    onChange,
    onDelete,
}: Props) {
    const [pickerOpen, setPickerOpen] = useState(false)
    const [pickups, setPickups] = useState<(number | null)[]>(Array(8).fill(null))

    useEffect(() => {
        if (pickups.every(p => p !== null)) {
            setPickerOpen(false)
        }
    }, [pickups])


    const addPickup = (p: Pickup) => {
        setPickups(prev => {
            const idx = prev.findIndex(v => v === null)
            if (idx === -1) return prev

            const next = [...prev]
            next[idx] = p.index
            return next
        })
    }


    const selectedItem =
        recipe.itemId >= 0
            ? items.find(i => i.index === recipe.itemId) ?? null
            : null

    return (
        <div>
            <div
                className={cn("flex flex-row gap-3 items-start justify-between rounded-lg border border-border transition-all p-3 bg-accent", pickerOpen && "bg-background")}
            >

                <div className="flex flex-col items-center justify-between gap-2">
                    <ItemSelect
                        items={items}
                        value={selectedItem}
                        onSelect={(item: Entity) =>
                            onChange({ itemId: item.index })
                        }
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onDelete}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                <div
                    onClick={() => setPickerOpen(true)}
                    className="cursor-pointer"
                >
                    <PickupGrid
                        pickups={pickups}
                        onRemove={i =>
                            setPickups(p =>
                                p.map((v, idx) => (idx === i ? null : v))
                            )
                        }
                    />
                </div>
            </div>
            <PickupPickerBar
                open={pickerOpen}
                pickups={ALL_PICKUPS}
                onPick={addPickup}
                onClose={() => setPickerOpen(false)}
            />
        </div>
    )
}
