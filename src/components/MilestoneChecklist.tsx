import { Checkbox } from "@/components/ui/checkbox"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { getCachedItems } from "@/lib/fetchItems"
import type { MilestoneSection } from "@/types/milestones"

interface Props {
    sections: MilestoneSection[]
}

export function MilestoneChecklist({ sections }: Props) {
    const [completed, setCompleted] = useLocalStorage<Record<string, boolean>>(
        "completed-milestones",
        {}
    )

    const [showCompleted, setShowCompleted] = useLocalStorage(
        "show-completed",
        true
    )

    const data = getCachedItems();

    if (!data)
        return;

    const { items } = data;

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
                                    <div
                                        key={id}
                                        className="flex items-start gap-3 rounded-lg border border-border p-4"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-3 items-center font-medium">
                                                <Checkbox
                                                    checked={!!isDone}
                                                    onCheckedChange={() => toggle(id)}
                                                />
                                                {m.title}
                                            </div>

                                            <div className="text-xs">
                                                {m.unlock}
                                            </div>

                                            {section.bad === false && (
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {m.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
