import { useLocalStorage } from "@/hooks/useLocalStorage"
import {
    createContext,
    ReactNode,
    useContext,
    useMemo
} from "react"

type UnlockedContextType = {
    unlocked: number[]
    toggle: (index: number) => void
    isUnlocked: (index: number) => boolean
}

const UnlockedContext = createContext<UnlockedContextType | undefined>(
    undefined
)

export function UnlockedProvider({ children }: { children: ReactNode }) {
    const [unlocked, setUnlocked] = useLocalStorage<number[]>(
        "unlocked-items",
        []
    )

    const unlockedSet = useMemo(() => new Set(unlocked), [unlocked])

    const toggle = (index: number) => {
        setUnlocked(prev => {
            const set = new Set(prev)
            set.has(index) ? set.delete(index) : set.add(index)
            return Array.from(set)
        })
    }

    const isUnlocked = (index: number) => unlockedSet.has(index)

    const value = useMemo(
        () => ({ unlocked, toggle, isUnlocked }),
        [unlocked]
    )

    return (
        <UnlockedContext.Provider value={value}>
            {children}
        </UnlockedContext.Provider>
    )
}

export function useUnlockedItems() {
    const context = useContext(UnlockedContext)

    if (!context) {
        throw new Error(
            "useUnlockedItems deve essere usato dentro <UnlockedProvider>"
        )
    }

    return context
}
