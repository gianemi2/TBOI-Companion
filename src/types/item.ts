import { BaseEntity } from "./baseEntity"

// types/item.ts
export type Item = BaseEntity & {
    index: number
    tid: number
    cid: number
    sid: number
    subtitle: string
    quality?: number | boolean
    type: string
    recharge: string
    pool: string
    kind: "item"
}
