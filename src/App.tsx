'use client'

import { Items } from "@/components/Items"
import { useEffect, useState } from "react"
import { LoadingScreen } from "./components/LoadingScreen"
import { fetchItems } from "@/lib/fetchItems"
import { Routes, Route, Link } from "react-router-dom"
import MilestonesPage from "./pages/MilestonePage"
import HomePage from "./pages/HomePage"


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
            <nav className="flex gap-4 border-b border-border p-4">
                <Link to="/" className="font-medium hover:underline">
                    Items
                </Link>

                <Link to="/milestones" className="font-medium hover:underline">
                    Milestones
                </Link>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/milestones" element={<MilestonesPage />} />
            </Routes>
        </div>
    )
}


