// components/EntityCard.tsx
import { useLongPress } from "@/hooks/useLongPress"
import { cn } from "@/lib/utils"
import { useUnlockedItems } from "@/providers/UnlockedContext"
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

    const { handlers, shouldPreventClick, pressing } = useLongPress(() => {
        toggle(entity.index)
        if (navigator.vibrate) navigator.vibrate(15)
    })


    const unlocked = !entity.unlock || isUnlocked(entity.index)

    let visualState = "opacity-100"

    if (!unlocked) {
        if (unlockMode === "dim-locked" || unlockMode === undefined) {
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
            onTouchStart={(e) => {
                e.preventDefault()
                handlers.onTouchStart?.()
            }}
            className={cn(`flex items-center justify-center w-9 h-9
             select-none
             outline-none focus:outline-none

             active:scale-95`, (!unlocked && unlockMode === "unlocked-only") && "hidden")}
            style={{
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent"
            }}

        >
            <div
                className={cn(
                    "transition-all duration-200 w-8 h-8 shrink-0 bg-no-repeat bg-contain",
                    !entity.scale && "scale-125",
                    visualState,
                    pressing && "scale-95 opacity-70",
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
