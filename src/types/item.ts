// types/item.ts
export interface Item {
    index: number
    tid: number
    cid: number
    sid: number
    title: string
    subtitle: string
    quality?: number
    unlock: string
    description: string
    type: string
    recharge: string
    pool: string
    bg?: string
}
