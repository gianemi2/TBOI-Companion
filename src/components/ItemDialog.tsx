// components/ItemDialog.tsx
import type { Item } from "@/types/item"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Star } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
    item: Item | null
    onClose: (item: Item | null) => void
}

export function ItemDialog({ item, onClose }: Props) {
    return (
        <Dialog open={!!item} onOpenChange={() => onClose(null)}>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-auto">
                {item && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 bg-no-repeat scale-200"
                                    style={{
                                        backgroundImage: `${item.bg ? item.bg : "url(/isaac.jpg)"}`,
                                        backgroundPosition: `${item.bg ? "" : `-${item.index * 32}px 0px`}`,
                                        backgroundSize: `${item.bg ? "" : "38688px 32px"}`
                                    }}
                                />
                                {item.title}
                                {
                                    (item.quality !== undefined && typeof item.quality !== "boolean") && (
                                        <div className="flex gap-1 items-center">
                                            {[1, 2, 3, 4].map((i) => (item.quality !== undefined && typeof item.quality !== "boolean" && item.quality! >= i) ? <Star className="text-yellow-300 fill-yellow-300 h-4 w-4" /> : <Star className=" h-4 w-4" />)}
                                        </div>
                                    )
                                }
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-2 text-sm whitespace-pre-line">
                            <p className="italic text-muted-foreground">
                                {item.subtitle}
                            </p>

                            <p>{item.description}</p>

                            <div className="flex gap-3 justify-between items-start border-t pt-2">
                                {
                                    (item.type || item.recharge || item.pool) && (
                                        <div className="text-xs text-muted-foreground">
                                            {item.type && <p>{item.type}</p>}
                                            {item.recharge && <p>{item.recharge}</p>}
                                            {item.pool && <p>{item.pool}</p>}
                                        </div>
                                    )
                                }

                                <Button variant="outline" asChild>
                                    <a target="_blank" href={`https://bindingofisaacrebirth.fandom.com/wiki/${item.title.trimStart().replaceAll(' ', '_')}`}>Vedi wiki</a>
                                </Button>
                            </div>


                            {item.unlock && <p className="mt-4 text-xs text-muted-foreground">{item.unlock}</p>}

                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
