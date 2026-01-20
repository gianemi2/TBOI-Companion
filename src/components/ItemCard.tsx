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
            className="flex items-center justify-center w-10 h-10"
        >
            {/* Sprite */}

            <div
                className="w-8 h-8 shrink-0 bg-no-repeat bg-contain scale-150"
                style={{
                    backgroundImage: `${item.bg ? item.bg : "url(/isaac.png)"}`,
                    backgroundPosition: `${item.bg ? "" : `-${item.index * 32}px 0px`}`,
                    backgroundSize: `${item.bg ? "" : "38688px 32px"}`,
                    willChange: "transform" // 👈 aiuta Safari
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
