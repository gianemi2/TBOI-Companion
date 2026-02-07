import { Pickup } from "@/types/pickup"
import { useState } from "react"
import { Command, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface Props {
    pickups: Pickup[]
    onSelect: (pickup: Pickup) => void
}

export function PickupSelect({ pickups, onSelect }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="w-full h-full" />
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[260px]">
                <Command>
                    <CommandInput placeholder="Cerca pickup..." />
                    <CommandGroup className="max-h-56 overflow-auto">
                        {pickups.map(p => (
                            <CommandItem
                                key={p.index}
                                onSelect={() => {
                                    onSelect(p)
                                    setOpen(false)
                                }}
                                className="flex items-center gap-2"
                            >
                                <div
                                    className="w-5 h-5 bg-no-repeat bg-contain"
                                    style={{
                                        backgroundImage: "url(/pickups.png)",
                                        backgroundPosition: `-${p.index * 32}px 0px`,
                                        backgroundSize: "4096px 32px",
                                    }}
                                />
                                {p.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
