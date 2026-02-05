import { Entity } from "@/types/entity";

export function getWikiUrl(entity: Entity) {
    return `https://bindingofisaacrebirth.fandom.com/wiki/${entity.name
        .trim()
        .replaceAll(" ", "_")}`
}
