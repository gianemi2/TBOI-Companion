import React from 'react'

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-4 space-y-4">{children}</div>
    )
}
