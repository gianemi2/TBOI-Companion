import { getCachedItems } from "@/lib/fetchItems";
import { getWikiUrl } from "@/lib/getWikiUrl";
import { Entity } from "@/types/entity";
import { useCallback, useState } from "react";
import { EntityDialog } from "./EntityDialog";
import { EntityList } from "./EntityList";
import { PageContainer } from "./ui/page-container";

export const Misc = () => {
    const [data] = useState(() => getCachedItems());
    const [selectedItem, setSelectedItem] = useState<Entity | null>(null)

    const handleSelectItem = useCallback((entity: Entity | null) => {
        if (entity === null)
            return setSelectedItem(entity)

        if (entity?.description)
            return setSelectedItem(entity);

        return window.open(getWikiUrl(entity), "_blank", "noopener,noreferrer")
    }, []);

    if (!data)
        return;

    const { misc } = data;

    return (
        <PageContainer>
            {
                misc.map(({ data, title }) => <EntityList entities={data} title={title} onSelectItem={handleSelectItem} />)
            }
            <EntityDialog entity={selectedItem} onClose={handleSelectItem} />
        </PageContainer>
    )
}
