// components/PoolSelect.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { PoolFilter } from "@/constants/pools"
import { POOL_FILTERS } from "@/constants/pools"

interface Props {
    value: PoolFilter
    onChange: (value: PoolFilter) => void
}

export function PoolSelect({ value, onChange }: Props) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtra per pool" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">Tutte</SelectItem>
                {POOL_FILTERS.map(pool => (
                    <SelectItem key={pool} value={pool}>
                        {pool}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
