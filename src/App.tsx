'use client'

import { Items } from "@/components/Items"
import { useEffect, useState } from "react"
import { LoadingScreen } from "./components/LoadingScreen"
import { fetchItems } from "@/lib/fetchItems"


function preloadImages() {
    return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = "/isaac.png"
        img.onload = () => resolve()
    })
}

export default function Page() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {

            await Promise.all([
                preloadImages(),
                fetchItems()
            ])

            setLoading(false)
        }

        load()
    }, [])

    if (loading) {
        return (
            <div className={`transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <LoadingScreen />
            </div>
        )
    }

    return (
        <div className="bg-[#272727] min-h-screen">
            <Items />
        </div>
    )
}
