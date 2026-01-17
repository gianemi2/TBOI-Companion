export type MilestoneItem = {
    title: string
    unlock: string
    description: string
    items: number | number[] | null | undefined
}

export type MilestoneSection = {
    milestoneTitle: string
    bad: boolean
    milestones: MilestoneItem[]
}
