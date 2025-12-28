// components/ItemDialog.tsx
import type { Item } from "@/types/item"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Star } from "lucide-react"

interface Props {
    item: Item | null
    onClose: () => void
}

export function ItemDialog({ item, onClose }: Props) {
    return (
        <Dialog open={!!item} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                {item && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 bg-no-repeat scale-200"
                                    style={{
                                        backgroundImage: `${item.bg ? item.bg : "url(/isaac.png)"}`,
                                        backgroundPosition: `${item.bg ? "" : `-${item.index * 32}px 0px`}`,
                                        backgroundSize: `${item.bg ? "" : "38688px 32px"}`
                                    }}
                                />
                                {item.title}
                                {
                                    item.quality !== undefined && (
                                        <div className="flex gap-1 items-center">
                                            {[1, 2, 3, 4].map((i) => item.quality! >= i ? <Star className="text-yellow-300 fill-yellow-300 h-4 w-4" /> : <Star className=" h-4 w-4" />)}
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

                            <div className="pt-2 border-t text-xs text-muted-foreground">
                                <p>{item.type}</p>
                                <p>{item.recharge}</p>
                                <p>{item.pool}</p>
                                <p>{item.unlock}</p>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
