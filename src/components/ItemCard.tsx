// components/ItemCard.tsx
import type { Item } from "@/types/item"
import React from "react"

interface Props {
    item: Item
    onClick: () => void
}

export const ItemCard = React.memo(({ item, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3 scale-125 rounded-md hover:bg-muted transition text-left"
        >
            {/* Sprite */}

            <div
                className="w-8 h-8 shrink-0 bg-no-repeat bg-contain"
                style={{
                    backgroundImage: `${item.bg ? item.bg : "url(/isaac.png)"}`,
                    backgroundPosition: `${item.bg ? "" : `-${item.index * 32}px 0px`}`,
                    backgroundSize: `${item.bg ? "" : "38688px 32px"}`
                }}
            />
            {/* 


            <div>
                <div className="font-medium leading-none">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                    {item.subtitle}
                </div>
            </div> */}
        </button>
    )
})
