// types/item.ts
export interface Item {
    index: number
    tid: number
    cid: number
    sid: number
    title: string
    subtitle: string
    quality: number | boolean
    unlock: string | boolean
    description: string
    type: string | boolean
    recharge: string | boolean
    pool: string | boolean
    bg?: string
}
