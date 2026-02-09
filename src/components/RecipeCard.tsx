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
import { Badge } from "./ui/badge"


interface Props {
    recipe: CainRecipe
    items: Entity[]
    onChange: (patch: Partial<CainRecipe>) => void
    onDelete: () => void
}

const getPickupItem = (index: number) => ALL_PICKUPS.find(_ => _.index === index)

export function RecipeCard({
    recipe,
    items,
    onChange,
    onDelete,
}: Props) {
    const [pickerOpen, setPickerOpen] = useState(false)
    const [sum, setSum] = useState(0);
    const [pools, setPools] = useState("")
    const pickups = recipe.pickups

    useEffect(() => {
        if (pickups.every(p => p !== null)) {
            setPickerOpen(false)
        }

        const total = pickups
            .map(p => (p === null ? null : getPickupItem(p)))
            .reduce((sum, pickup) => sum + (pickup?.quality ?? 0), 0)

        const pools = pickups
            .map(p => (p === null ? null : getPickupItem(p)))
            .reduce((pool, pickup) => pool + (pickup?.specialPool ?? ""), "")

        setSum(total)
        setPools(pools)
    }, [pickups])



    const addPickup = (p: Pickup) => {
        const idx = recipe.pickups.findIndex(v => v === null)
        if (idx === -1) return

        const next = [...recipe.pickups]
        next[idx] = p.index

        onChange({ pickups: next })
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

                <div className="flex flex-col items-start justify-between gap-2">
                    <div className="relative">
                        <ItemSelect
                            items={items}
                            value={selectedItem}
                            onSelect={(item: Entity) =>
                                onChange({ itemId: item.index })
                            }
                        />
                        {
                            sum > 0 && <Badge className="absolute bottom-0 -right-2 w-5 h-5 text-[10px] bg-accent" variant="outline">{sum}</Badge>
                        }
                    </div>


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
                        pickups={recipe.pickups}
                        onRemove={i => {
                            const next = [...recipe.pickups]
                            next[i] = null
                            onChange({ pickups: next })
                        }}
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
