import milestones from "@/data/milestones.json"
import { MilestoneChecklist } from "@/components/MilestoneChecklist"

export default function MilestonesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            <h1 className="text-3xl font-bold mb-6">
                Milestones
            </h1>

            <MilestoneChecklist sections={milestones} />
        </div>
    )
}
