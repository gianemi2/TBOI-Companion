import { getCachedItems } from '@/lib/fetchItems'
import { Item } from '@/types/item'
import type { MilestoneItem } from '@/types/milestones'
import { EntityCard } from './EntityCard'
import { Checkbox } from './ui/checkbox'
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

                    {milestoneItems.map((item: Item) => <EntityCard
                        key={item.index}
                        entity={item}
                        onClick={() => onSelectItem(item)}
                    />)}
                </div>

                <SpoilerText className='text-xs' text={milestone.unlock} />

                {milestone.description && <SpoilerText text={milestone.description} />}

                {!milestone.description && milestoneItems.map((item, index) => <SpoilerText key={`${item.index}-${index}`} text={item.description} />)}



            </div>
        </div>
    )
}
