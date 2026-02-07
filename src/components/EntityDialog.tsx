// components/ItemDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { getWikiUrl } from "@/lib/getWikiUrl"
import { Entity } from "@/types/entity"
import type { Item } from "@/types/item"
import { Star } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
    entity: Entity | null
    onClose: (item: Item | null) => void
}

export function EntityDialog({ entity, onClose }: Props) {
    return (
        <Dialog open={!!entity} onOpenChange={() => onClose(null)}>
            <DialogContent className="max-w-lg w-[95%] max-h-[80vh] overflow-auto">
                {entity && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 bg-no-repeat scale-200"
                                    style={{
                                        backgroundImage: `${entity.bg ? entity.bg : "url(/isaac.png)"}`,
                                        backgroundPosition: `${entity.bg ? "" : `-${entity.index * 32}px 0px`}`,
                                        backgroundSize: `${entity.bg ? "contain" : "38688px 32px"}`
                                    }}
                                />
                                {entity.name}
                                {
                                    (entity.kind !== "misc" && typeof entity.quality === "number") && (
                                        <div className="flex gap-1 items-center">
                                            {[1, 2, 3, 4].map((i) => (typeof entity.quality === "number" && entity.quality! >= i) ? <Star className="text-yellow-300 fill-yellow-300 h-4 w-4" /> : <Star className=" h-4 w-4" />)}
                                        </div>
                                    )
                                }
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-2 text-sm whitespace-pre-line">

                            {
                                entity.kind === "misc" ? <p>{entity.description}</p> : (
                                    <>
                                        <p className="italic text-muted-foreground">
                                            {entity.subtitle}
                                        </p>

                                        <p>{entity.description}</p>

                                        <div className="flex gap-3 justify-between items-start border-t pt-2">
                                            {
                                                (entity.type || entity.recharge || entity.pool) && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {entity.type && <p>{entity.type}</p>}
                                                        {entity.recharge && <p>{entity.recharge}</p>}
                                                        {entity.pool && <p>{entity.pool}</p>}
                                                    </div>
                                                )
                                            }

                                            <Button variant="outline" asChild>
                                                <a target="_blank" href={getWikiUrl(entity)}>Vedi wiki</a>
                                            </Button>
                                        </div>
                                    </>
                                )
                            }

                            {entity.unlock && <p className="mt-4 text-xs text-muted-foreground">{entity.unlock}</p>}

                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
