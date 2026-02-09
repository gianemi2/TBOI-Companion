

export const CAIN_Q = [
    0, 1, 2, 3, 4, 5, 7, 8, 10
] as const

export type CainPickupQualities = (typeof CAIN_Q)[number]


export type Pickup = {
    name: string
    bg?: string
    index: number
    quality: CainPickupQualities
    specialPool?: string
    specialPoolHint?: string
}
