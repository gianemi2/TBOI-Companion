import { Entity } from "@/types/entity"
import { EntityCard } from "./EntityCard"

type EntityListProps = {
    entities: Entity[]
    title: string
    onSelectItem: (entity: Entity) => void
}

export const EntityList = ({
    entities,
    title,
    onSelectItem
}: EntityListProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex flex-wrap gap-1">
                {entities.map((entity: Entity) => (
                    <EntityCard
                        key={entity.index}
                        entity={entity}
                        onClick={() => onSelectItem(entity)}
                    />
                ))}
            </div>
        </div>
    )
}