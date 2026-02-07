'use client'

import { Items } from "@/components/Items"
import { fetchItems } from "@/lib/fetchItems"
import { BookText, CoinsIcon, Milestone, MoreHorizontal, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { LoadingScreen } from "./components/LoadingScreen"
import { Button } from "./components/ui/button"
import { ButtonGroup } from "./components/ui/button-group"
import { APP_VERSION } from "./constants/AppVersion"
import MilestonesPage from "./pages/MilestonePage"
import MiscPage from "./pages/MiscPage"
import TaintedCainPage from "./pages/TaintedCainPage"

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "./lib/utils"


function preloadImages() {
    return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = "/isaac.png"
        img.onload = () => resolve()
    })
}

const PAGES = [
    "items", "milestones", "misc", "taintedCain"
] as const;

type Page = (typeof PAGES)[number]

export default function Page() {
    const [loading, setLoading] = useState(true)
    const [activePage, setActivePage] = useState<Page>("items")
    const [moreOpen, setMoreOpen] = useState(false)

    const isInMore = activePage === "misc" || activePage === "taintedCain"



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
        <div className="relative min-h-[100dvh]">
            <img
                src="/cellar.jpg"
                alt=""
                className="fixed inset-0 w-full h-full object-cover -z-20"
            />

            <div className="fixed inset-0 bg-black/30 -z-10" />
            <div className="min-h-[100dvh] pb-12">
                <div
                    style={{
                        backgroundImage: "url(/isaac.png)",
                        width: 0,
                        height: 0,
                        position: "fixed",
                        opacity: 0
                    }}
                />
                <ButtonGroup className="fixed bottom-4 mx-auto left-0 right-0 z-50 rounded-lg">

                    {/* ITEMS */}
                    <Button
                        className={`gap-2 py-3 ${activePage === "items" ? "bg-zinc-700" : "bg-zinc-600"}`}
                        variant="secondary"
                        onClick={() => setActivePage("items")}
                    >
                        <ShoppingBag />
                        items
                    </Button>

                    {/* MILESTONES */}
                    <Button
                        className={`gap-2 py-3 ${activePage === "milestones" ? "bg-zinc-700" : "bg-zinc-600"}`}
                        variant="secondary"
                        onClick={() => setActivePage("milestones")}
                    >
                        <Milestone />
                        milestones
                    </Button>

                    {/* MORE */}
                    <Popover open={moreOpen} onOpenChange={setMoreOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="secondary"
                                className={cn(
                                    "py-3",
                                    isInMore ? "bg-zinc-700" : "bg-zinc-600"
                                )}
                            >
                                <MoreHorizontal />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            side="top"
                            align="center"
                            className="animate-in slide-in-from-bottom-2 fade-in-0 mb-2 w-44 p-2 rounded-lg bg-zinc-800 border-zinc-700"
                        >
                            <button
                                onClick={() => {
                                    setActivePage("misc")
                                    setMoreOpen(false)
                                }}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-zinc-700"
                            >
                                <BookText className="w-4 h-4" />
                                Misc
                            </button>

                            <button
                                onClick={() => {
                                    setActivePage("taintedCain")
                                    setMoreOpen(false)
                                }}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-zinc-700"
                            >
                                <CoinsIcon className="w-4 h-4" />
                                Tainted Cain
                            </button>
                        </PopoverContent>
                    </Popover>
                </ButtonGroup>


                {activePage === "items" && <Items />}
                {activePage === "milestones" && <MilestonesPage />}
                {activePage === "misc" && <MiscPage />}
                {activePage === "taintedCain" && <TaintedCainPage />}
            </div>
            <div className="py-2 px-6 text-xs text-right">v. {APP_VERSION}</div>
        </div>

    )
}


