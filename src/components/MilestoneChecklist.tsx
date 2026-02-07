import { Checkbox } from "@/components/ui/checkbox"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { Item } from "@/types/item"
import type { MilestoneSection } from "@/types/milestones"
import { useState } from "react"
import { EntityDialog } from "./EntityDialog"
import MilestoneItem from "./MilestoneItem"
import { Input } from "./ui/input"
import { PageContainer } from "./ui/page-container"
import { SearchContainer } from "./ui/search-container"

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
        <PageContainer>
            {/* FILTER */}
            <SearchContainer className="flex-wrap sticky top-0 bg-accent/90 z-10 -m-4 mb-4 p-4">
                <div className="flex flex-col gap-2">
                    <Input
                        type="text"
                        placeholder="Nome personaggio"
                        value={unlockFilter}
                        onChange={e => setUnlockFilter(e.target.value)}
                        className="w-auto"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={showCompleted}
                        onCheckedChange={() => setShowCompleted(v => !v)}
                        id="show-completed"
                    />
                    <label
                        htmlFor="show-completed"
                        className="text-sm cursor-pointer select-none"
                    >
                        Mostra milestone completati
                    </label>
                </div>

            </SearchContainer>


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


            <EntityDialog onClose={setSelectedItem} entity={selectedItem} />

        </PageContainer>
    )
}
