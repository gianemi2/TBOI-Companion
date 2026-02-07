import { cn } from '@/lib/utils'
import React from 'react'

export const SearchContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (

        <div className={cn("flex gap-2 items-center", className)}>
            {children}
        </div>
    )
}
