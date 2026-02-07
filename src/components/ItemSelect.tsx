import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Entity } from "@/types/entity"
import { useState } from "react"
import { Button } from "./ui/button"

interface Props {
    items: Entity[]
    value: Entity | null
    onSelect: (item: Entity) => void
}

export function ItemSelect({ items, value, onSelect }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="icon-lg"
                    className=""
                    variant="outline"
                >
                    {value && (
                        <>
                            <div
                                className={cn(
                                    "w-8 h-8 bg-no-repeat bg-contain",
                                    value.scale ?? "scale-125"
                                )}
                                style={{
                                    backgroundImage: value.bg ?? "url(/isaac.png)",
                                    backgroundPosition: value.bg
                                        ? undefined
                                        : `-${value.index * 32}px 0px`,
                                    backgroundSize: value.bg ? undefined : `38688px 32px`,
                                }}
                            />
                        </>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[320px]" align="start" >
                <Command className="bg-accent">
                    <CommandInput className="focus:outline-none" placeholder="Cerca oggetto..." />
                    <CommandEmpty>Nessun risultato</CommandEmpty>

                    <CommandGroup className="max-h-32 overflow-auto">
                        {items.map(item => (
                            <CommandItem
                                key={item.index}
                                value={item.name}
                                onSelect={() => {
                                    onSelect(item)
                                    setOpen(false) // 🔥 CHIUDE
                                }}
                                className="flex items-center p-1 hover:bg-secondary text-light"
                            >
                                <div
                                    className={cn(
                                        "w-8 h-8 bg-no-repeat bg-contain"
                                    )}
                                    style={{
                                        backgroundImage: item.bg ?? "url(/isaac.png)",
                                        backgroundPosition: item.bg
                                            ? undefined
                                            : `-${item.index * 32}px 0px`,
                                        backgroundSize: item.bg ? undefined : "38688px 32px",
                                    }}
                                />
                                {item.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
