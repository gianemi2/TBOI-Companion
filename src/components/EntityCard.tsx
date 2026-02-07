// components/EntityCard.tsx
import { cn } from "@/lib/utils"
import { Entity } from "@/types/entity"
import React from "react"

interface Props {
    entity: Entity
    onClick: () => void
}

export const EntityCard = React.memo(({ entity, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center w-9 h-9"
        >
            {/* Sprite */}

            <div
                className={cn("w-8 h-8 shrink-0 bg-no-repeat bg-contain", !entity.scale && "scale-125")}
                style={{
                    backgroundImage: `${entity.bg ? entity.bg : "url(/isaac.png)"}`,
                    backgroundPosition: `${entity.bg || (entity.kind === "misc" && entity.bg) ? "" : `-${entity.index * 32}px 0px`}`,
                    backgroundSize: `${entity.bg ? "" : "38688px 32px"}`,
                    willChange: "transform",
                    transform: `${entity.scale && `scale(${entity.scale})`}`
                }}
            />
        </button>
    )
})
