import { useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"

export function useUnlockedItems() {
    const [unlocked, setUnlocked] = useLocalStorage<number[]>(
        "unlocked-items",
        []
    )

    const unlockedSet = useMemo(() => new Set(unlocked), [unlocked])

    const toggle = (index: number) => {
        setUnlocked(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    const isUnlocked = (index: number) =>
        unlocked.includes(index)

    return { unlocked, toggle, isUnlocked, unlockedSet }
}
