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
    const [unlockFilter, setUnlockFilter] = useState<string>("")
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
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-3">
                    <Checkbox
                        checked={showCompleted}
                        onCheckedChange={() => setShowCompleted(v => !v)}
                    />
                    <span className="text-sm text-muted-foreground">
                        Mostra completati
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">
                        Filtra per condizione di sblocco
                    </span>
                    <input
                        type="text"
                        placeholder="Nome personaggio"
                        value={unlockFilter}
                        onChange={e => setUnlockFilter(e.target.value)}
                        className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>


            {sections.map(section => {
                // 1️⃣ Filtra i milestone della sezione
                const filteredMilestones = section.milestones.filter(m => {
                    const id = `${section.milestoneTitle}-${m.title}`
                    const isDone = completed[id]

                    // nascondi completati se richiesto
                    if (isDone && !showCompleted) return false

                    // filtro testuale su unlock
                    if (unlockFilter.trim()) {
                        return m.unlock
                            .toLowerCase()
                            .includes(unlockFilter.toLowerCase())
                    }

                    return true
                })

                // 2️⃣ Se non ci sono milestone visibili → nascondi sezione
                if (filteredMilestones.length === 0) {
                    return null
                }

                return (
                    <div key={section.milestoneTitle}>
                        <h2 className="text-xl font-bold mb-4">
                            {section.milestoneTitle}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMilestones.map(m => {
                                const id = `${section.milestoneTitle}-${m.title}`
                                const isDone = completed[id]

                                return (
                                    <MilestoneItem
                                        key={id}
                                        milestone={m}
                                        onToggle={toggle}
                                        onSelectItem={setSelectedItem}
                                        id={id}
                                        isDone={isDone}
                                    />
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
