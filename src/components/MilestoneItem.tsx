import React from 'react'
import { Checkbox } from './ui/checkbox'
import type { MilestoneItem, MilestoneSection } from '@/types/milestones'
import { Item } from '@/types/item'
import { getCachedItems } from '@/lib/fetchItems'
import { ItemCard } from './ItemCard'

type MilestoneItemProps = {
    id: string
    milestone: MilestoneItem
    isDone: boolean
    onToggle: (id: string) => void
    onSelectItem: (item: Item | null) => void
}

export default function MilestoneItem({ id, milestone, isDone, onToggle, onSelectItem }: MilestoneItemProps) {

    const data = getCachedItems();

    if (!data)
        return;

    const items = [...data.items, ...data.trinkets, ...data.consumables];

    const milestoneItems = (milestone.items !== null
        && Array.isArray(milestone?.items)
        ? milestone.items.map(index => items.find(i => i.index === index))
        : [items.find(i => i.index === milestone.items)]
    ).filter((item): item is Item => Boolean(item))

    return (
        <div
            className="flex items-start gap-3 rounded-lg border border-border p-4 bg-[#272727]"
        >
            <div className="flex flex-col gap-2">
                <div className="flex gap-3 items-center font-medium">
                    <Checkbox
                        className="border-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        checked={!!isDone}
                        onCheckedChange={() => onToggle(id)}
                    />
                    {milestone.title}

                    {milestoneItems.map((item: Item) => <ItemCard
                        item={item}
                        onClick={() => onSelectItem(item)}
                    />)}
                </div>

                <div className="text-xs">
                    {milestone.unlock}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    {milestone.description}
                </p>

            </div>
        </div>
    )
}
