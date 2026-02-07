export type CainRecipe = {
    id: string
    itemId: number          // entity.index dell’item craftato
    pickups: (number | null)[] // 8 slot → index del pickup
    createdAt: number
}
