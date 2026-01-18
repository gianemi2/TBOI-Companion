import { cn } from "@/lib/utils"
import { useState } from "react"

export function SpoilerText({ text, className }: { text: string, className?: string }) {
    const [revealed, setRevealed] = useState(false)

    return (
        <p className={cn("text-sm leading-relaxed", className)}>
            {text.split(/(\|\|.*?\|\|)/g).map((part, i) => {
                if (part.startsWith("||") && part.endsWith("||")) {
                    const content = part.slice(2, -2)

                    return (
                        <span
                            key={i}
                            onClick={() => setRevealed(true)}
                            className={
                                revealed
                                    ? "bg-transparent cursor-default transition-all"
                                    : "inline-flex items-center bg-gray-400 text-transparent rounded px-1 cursor-pointer transition-all max-h-10 overflow-hidden leading-tight"
                            }
                        >
                            {content}
                        </span>
                    )
                }

                return <span key={i}>{part}</span>
            })}
        </p>
    )
}
