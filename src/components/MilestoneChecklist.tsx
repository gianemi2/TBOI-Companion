import { Checkbox } from "@/components/ui/checkbox"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { getCachedItems } from "@/lib/fetchItems"
import type { MilestoneSection } from "@/types/milestones"
import type { Item } from "@/types/item"
import { ItemDialog } from "./ItemDialog"
import MilestoneItem from "./MilestoneItem"
import { useState } from "react"

interface Props {
    sections: MilestoneSection[]
}

export function MilestoneChecklist({ sections }: Props) {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [completed, setCompleted] = useLocalStorage<Record<string, boolean>>(
        "completed-milestones",
        {}
    )

    const [showCompleted, setShowCompleted] = useLocalStorage(
        "show-completed",
        false
    )

    function toggle(id: string) {
        setCompleted(prev => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    return (
        <div className="space-y-8">
            {/* FILTER */}
            <div className="flex items-center gap-3">
                <Checkbox
                    checked={showCompleted}
                    onCheckedChange={() => setShowCompleted(v => !v)}
                />
                <span className="text-sm text-muted-foreground">
                    Mostra completati
                </span>
            </div>

            {sections.map(section => {
                const allCompleted = section.milestones.every(
                    m => completed[`${section.milestoneTitle}-${m.title}`]
                )

                if (allCompleted && !showCompleted) {
                    return null
                }

                return (
                    <div key={section.milestoneTitle}>
                        <h2 className="text-xl font-bold mb-4">
                            {section.milestoneTitle}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.milestones.map(m => {
                                const id = `${section.milestoneTitle}-${m.title}`
                                const isDone = completed[id]

                                if (isDone && !showCompleted) return null

                                return (
                                    <MilestoneItem
                                        milestone={m}
                                        onToggle={toggle}
                                        onSelectItem={setSelectedItem}
                                        id={id}
                                        isDone={isDone}
                                        key={id} />
                                )
                            })}
                        </div>
                    </div>
                )
            })}

            <ItemDialog onClose={setSelectedItem} item={selectedItem} />

        </div>
    )
}
