import { ALL_PICKUPS } from "@/constants/Pickups"
import { Button } from "./ui/button"

export function PickupGrid({
    pickups,
    onRemove,
}: {
    pickups: (number | null)[]
    onRemove: (index: number) => void
}) {

    const pickupItems = pickups.map((index) => ALL_PICKUPS.find(_ => _.index === index))

    return (
        <div className="grid grid-cols-4 gap-2">
            {pickupItems.map((pickup, i) => (
                <Button
                    key={i}
                    variant="ghost"
                    className="border-primary/30 border"
                    onClick={() => pickup !== null && onRemove(i)}
                    size="icon-lg"
                >
                    {(pickup && pickup !== null) && (
                        <div
                            className="w-10 h-10 bg-no-repeat bg-contain scale-125"
                            style={{
                                backgroundImage: pickup?.bg ?? "url(/isaac.png)",
                                backgroundPosition: pickup?.bg
                                    ? undefined
                                    : `-${pickup?.index * 32}px 0px`,
                                backgroundSize: pickup?.bg ? undefined : "38688px 32px",
                            }}
                        />
                    )}
                </Button>
            ))}
        </div>
    )
}
