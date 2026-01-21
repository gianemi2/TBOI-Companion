import { cn } from '@/lib/utils'
import React from 'react'

export const SearchContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (

        <div className={cn("flex gap-2 items-center sticky top-0 bg-accent/90 z-10 -m-4 mb-4 p-4", className)}>
            {children}
        </div>
    )
}
