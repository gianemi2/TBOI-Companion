import { useLocalStorage } from "@/hooks/useLocalStorage"
import { CainRecipe } from "@/types/recipe"

export function useCainRecipes() {
    const [recipes, setRecipes] = useLocalStorage<CainRecipe[]>(
        "tainted-cain-recipes",
        []
    )

    const addRecipe = () => {
        setRecipes(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                itemId: -1,
                pickups: Array(8).fill(null),
                createdAt: Date.now(),
            },
        ])
    }

    const updateRecipe = (id: string, patch: Partial<CainRecipe>) => {
        setRecipes(prev =>
            prev.map(r => (r.id === id ? { ...r, ...patch } : r))
        )
    }

    const removeRecipe = (id: string) => {
        setRecipes(prev => prev.filter(r => r.id !== id))
    }

    return {
        recipes,
        addRecipe,
        updateRecipe,
        removeRecipe,
    }
}
