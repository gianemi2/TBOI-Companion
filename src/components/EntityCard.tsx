// components/EntityCard.tsx
import { useLongPress } from "@/hooks/useLongPress"
import { useUnlockedItems } from "@/hooks/useUnlockedItems"
import { cn } from "@/lib/utils"
import { Entity } from "@/types/entity"
import { UnlockFilterMode } from "@/types/unlockFilterMode"
import React from "react"

interface Props {
    entity: Entity
    onClick: () => void,
    unlockMode?: UnlockFilterMode
}

export const EntityCard = React.memo(({ entity, onClick, unlockMode }: Props) => {
    const { toggle, isUnlocked } = useUnlockedItems()

    const { handlers, shouldPreventClick } = useLongPress(() => {
        toggle(entity.index)
        if (navigator.vibrate) navigator.vibrate(15)
    })


    const unlocked = !entity.unlock || isUnlocked(entity.index)

    let visualState = "opacity-100"

    if (!unlocked) {
        if (unlockMode === "dim-locked") {
            visualState = "opacity-25 grayscale"
        }
    }


    return (
        <button
            {...handlers}
            onClick={(e) => {
                if (shouldPreventClick()) {
                    e.preventDefault()
                    return
                }
                onClick()
            }}
            onContextMenu={(e) => e.preventDefault()}
            style={{ WebkitTouchCallout: "none" }}
            className={cn("flex items-center justify-center select-none w-9 h-9", (!unlocked && unlockMode === "unlocked-only") && "hidden")}
        >
            <div
                className={cn(
                    "transition-all duration-200 w-8 h-8 shrink-0 bg-no-repeat bg-contain",
                    !entity.scale && "scale-125",
                    visualState
                )}
                style={{
                    backgroundImage: entity.bg ?? "url(/isaac.png)",
                    backgroundPosition: entity.bg
                        ? undefined
                        : `-${entity.index * 32}px 0px`,
                    backgroundSize: entity.bg ? undefined : "38688px 32px",
                }}
            />
        </button>
    )
})
