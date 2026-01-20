'use client'

import { Items } from "@/components/Items"
import { useEffect, useState } from "react"
import { LoadingScreen } from "./components/LoadingScreen"
import { fetchItems } from "@/lib/fetchItems"
import MilestonesPage from "./pages/MilestonePage"
import { ButtonGroup } from "./components/ui/button-group"
import { Button } from "./components/ui/button"
import { Milestone, ShoppingBag } from "lucide-react"
import { APP_VERSION } from "./constants/AppVersion"

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
        const prev = localStorage.getItem("app_version")

        if (prev && prev !== APP_VERSION) {
            localStorage.setItem("app_version", APP_VERSION)
            location.reload()
        } else {
            localStorage.setItem("app_version", APP_VERSION)
        }
    }, [])

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
        <div>
            <div className="bg-center bg-no-repeat bg-fixed min-h-screen fixed top-0 bottom-0 left-0 right-0 -z-10" style={{
                backgroundImage: "url(/cellar.jpg)",
            }}></div>
            <div className="min-h-screen pb-12">
                <div
                    style={{
                        backgroundImage: "url(/isaac.png)",
                        width: 0,
                        height: 0,
                        position: "fixed",
                        opacity: 0
                    }}
                />
                <ButtonGroup className=" fixed bottom-4 mx-auto left-0 right-0 z-50 rounded-lg">
                    {
                        PAGES.map(page => (
                            <Button
                                key={page}
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
            <div className="py-2 px-6 text-xs text-right">v. {APP_VERSION}</div>
        </div>

    )
}


