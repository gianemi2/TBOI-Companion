import { BaseEntity } from "./baseEntity"

// types/misc.ts
export type MiscItem = BaseEntity & {
    kind: "misc"
    bg: string
}

export interface MiscGroup {
    title: string
    data: MiscItem[]
}
