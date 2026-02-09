import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { CAIN_Q, Pickup } from "@/types/pickup"
import { X } from "lucide-react"
import { useState } from "react"
import { CainQualityTable } from "./CainQualityTable"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

function PickupButton({ p, onPick, onOpenTooltip }: { p: Pickup, onPick?: (p: Pickup) => void, onOpenTooltip?: (open: boolean) => void }) {
    return (
        <Button
            size="icon-sm"
            key={p.index}
            onClick={() => onPick ? onPick(p) : p.specialPool && onOpenTooltip ? onOpenTooltip(true) : null}
            className={cn(`
                        rounded-md
                        border
                        hover:bg-muted
                        flex items-center justify-center
                      `, (p.specialPool && onPick === undefined) && "bg-blue-800")}
        >
            <div
                className={cn(`w-8 h-8 bg-no-repeat bg-contain`)}
                style={{
                    backgroundImage: p.bg ?? "url(/isaac.png)",
                    backgroundPosition: p.bg
                        ? undefined
                        : `-${p.index * 32}px 0px`,
                    backgroundSize: p.bg ? undefined : "38688px 32px",
                }}
            />
        </Button>
    )
}

function PickupTooltip({ p }: { p: Pickup }) {
    const [open, setOpen] = useState(false);
    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger><PickupButton p={p} onOpenTooltip={setOpen} /></TooltipTrigger>
            <TooltipContent>{p.specialPool} {p.specialPoolHint}</TooltipContent>
        </Tooltip>
    )
}

export function PickupPickerBar({
    open,
    pickups,
    onPick,
    onClose,
}: {
    open: boolean
    pickups: Pickup[]
    onPick?: (p: Pickup) => void
    onClose?: () => void
}) {

    const sample = onPick === undefined

    return (
        <Collapsible open={open}>
            <CollapsibleContent
                className="
          fixed bottom-0 left-0 right-0
          bg-accent
          z-50
          flex
          flex-col
          mx-auto
          rounded-t-xl
        ">

                <div className="px-3 pb-3 max-h-[70vh] overflow-auto flex flex-col">
                    <Button variant="ghost" size="icon" onClick={onClose} className="self-end sticky top-2">
                        <X />
                    </Button>
                    <div className="flex flex-wrap gap-3">
                        {CAIN_Q.map(q => (
                            <div key={q}>
                                <div className="text-xs font-semibold text-muted-foreground mb-1">
                                    {q}
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {pickups
                                        .filter(p => p.quality === q)
                                        .map(p => {
                                            return sample && p.specialPool !== undefined
                                                ? <PickupTooltip p={p} />
                                                : <PickupButton p={p} onPick={onPick} />
                                        })}
                                </div>
                            </div>
                        ))}
                    </div>
                    {
                        sample && (
                            <div className="mt-3">
                                <CainQualityTable />
                            </div>
                        )
                    }
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
