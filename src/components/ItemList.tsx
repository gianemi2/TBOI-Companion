import type { Item } from "@/types/item"
import { ItemCard } from "./ItemCard"

type ItemListProps = {
    items: Item[]
    title: string
    onSelectItem: (item: Item) => void
}

export const ItemList = ({
    items,
    title,
    onSelectItem
}: ItemListProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex flex-wrap gap-1">
                {items.map((item: Item) => (
                    <ItemCard
                        key={item.index}
                        item={item}
                        onClick={() => onSelectItem(item)}
                    />
                ))}
            </div>
        </div>
    )
}