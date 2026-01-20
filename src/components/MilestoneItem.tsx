import React from 'react'
import { Checkbox } from './ui/checkbox'
import type { MilestoneItem, MilestoneSection } from '@/types/milestones'
import { Item } from '@/types/item'
import { getCachedItems } from '@/lib/fetchItems'
import { ItemCard } from './ItemCard'
import { SpoilerText } from './ui/spoiler-text'

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
            className="flex items-start gap-3 rounded-lg border border-border p-4 bg-accent"
        >
            <div className="flex flex-col gap-2">
                <div className="flex gap-3 items-center font-medium">
                    <Checkbox
                        checked={!!isDone}
                        onCheckedChange={() => onToggle(id)}
                    />
                    <SpoilerText text={milestone.title} className='text-base'></SpoilerText>

                    {milestoneItems.map((item: Item) => <ItemCard
                        item={item}
                        onClick={() => onSelectItem(item)}
                    />)}
                </div>

                <SpoilerText className='text-xs' text={milestone.unlock} />

                <SpoilerText text={milestone.description} />



            </div>
        </div>
    )
}
