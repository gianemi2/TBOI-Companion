import { Item } from "./item"

export type MilestoneSection = {
    milestoneTitle: string
    bad: boolean
    milestones: {
        title: string
        unlock: string
        description: string
        items?: number[]
    }[]
}
