import { PickupPickerBar } from "@/components/PickupPickerBar"
import { RecipeCard } from "@/components/RecipeCard"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/ui/page-container"
import { ALL_PICKUPS } from "@/constants/Pickups"
import { useCainRecipes } from "@/hooks/useCainRecipes"
import { getCachedItems } from "@/lib/fetchItems"
import { InfoIcon, Plus } from "lucide-react"
import { useState } from "react"

export default function TaintedCainPage() {
    const data = getCachedItems()
    if (!data) return null

    const [pickerOpen, setPickerOpen] = useState(false)

    const { items } = data
    const { recipes, addRecipe, updateRecipe, removeRecipe } =
        useCainRecipes()

    return (
        <PageContainer>
            <div className="flex justify-between items-center">
                <Button onClick={addRecipe}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuova recipe
                </Button>
                <Button size="icon" onClick={() => setPickerOpen(prev => !prev)}>
                    <InfoIcon />
                </Button>
            </div>

            <div className="grid gap-3 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                {recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        items={items}
                        onChange={patch =>
                            updateRecipe(recipe.id, patch)
                        }
                        onDelete={() => removeRecipe(recipe.id)}
                    />
                ))}
            </div>

            <PickupPickerBar
                open={pickerOpen}
                pickups={ALL_PICKUPS}
                onClose={() => setPickerOpen(false)}
            />
        </PageContainer>
    )
}
