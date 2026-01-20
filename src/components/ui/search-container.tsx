import React from 'react'

export const SearchContainer = ({ children }: { children: React.ReactNode }) => {
    return (

        <div className="flex gap-2 items-center sticky top-0 bg-accent z-10 -m-4 mb-4 p-4">
            {children}
        </div>
    )
}
