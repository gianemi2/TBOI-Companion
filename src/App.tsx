'use client'

import { Items } from "@/components/Items"
import { useEffect, useState } from "react"
import { LoadingScreen } from "./components/LoadingScreen"
import { fetchItems } from "@/lib/fetchItems"
import MilestonesPage from "./pages/MilestonePage"
import { ButtonGroup } from "./components/ui/button-group"
import { Button } from "./components/ui/button"
import { Milestone, ShoppingBag } from "lucide-react"


function preloadImages() {
    return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = "/isaac.png"
        img.onload = () => resolve()
    })
}

const PAGES = [
    "items", "milestones"
] as const;

type Page = (typeof PAGES)[number]

export default function Page() {
    const [loading, setLoading] = useState(true)
    const [activePage, setActivePage] = useState<Page>("items")

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
        <div className="bg-[#272727] min-h-screen pb-12">
            <div
                style={{
                    backgroundImage: "url(/isaac.png)",
                    width: 0,
                    height: 0,
                    position: "fixed",
                    opacity: 0
                }}
            />
            <ButtonGroup className=" fixed bottom-2 mx-auto left-0 right-0 z-50 rounded-lg">
                {
                    PAGES.map(page => (
                        <Button
                            className={`transition-all gap-2 py-3 capitalize ${page === activePage ? 'bg-zinc-700' : 'bg-zinc-600'}`}
                            variant="secondary"
                            onClick={() => setActivePage(page)}
                        >
                            {page === "items" ? <ShoppingBag /> : <Milestone />}
                            {page}
                        </Button>
                    ))
                }
            </ButtonGroup>

            {activePage === "items" ? <Items /> : <MilestonesPage />}
        </div>
    )
}


