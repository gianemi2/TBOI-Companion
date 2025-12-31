// constants/pools.ts
export const POOL_FILTERS = [
    "Devil Room",
    "Angel Room",
    "Shop",
    "Item Room",
    "Chest",
    "Challenge",
    "Boss Room",
    "Beggar"
] as const

export type PoolFilter = (typeof POOL_FILTERS)[number] | "all"
