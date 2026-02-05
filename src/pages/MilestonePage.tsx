import { MilestoneChecklist } from "@/components/MilestoneChecklist"
import { getCachedItems } from "@/lib/fetchItems";
import { useState } from "react";

export default function MilestonesPage() {

    const [data] = useState(() => getCachedItems());

    if (!data)
        return;

    const { milestones } = data;

    return (
        <div className="min-h-[100dvh]"><MilestoneChecklist sections={milestones} /></div>
    )
}
