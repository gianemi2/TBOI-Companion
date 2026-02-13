import { useRef, useState } from "react"

export function useLongPress(
    callback: () => void,
    delay = 450
) {
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const longPressTriggered = useRef(false)
    const [pressing, setPressing] = useState(false)

    const start = () => {
        longPressTriggered.current = false
        setPressing(true)

        timerRef.current = setTimeout(() => {
            callback()
            longPressTriggered.current = true
            setPressing(false)
        }, delay)
    }

    const clear = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        setPressing(false)
    }

    const shouldPreventClick = () => longPressTriggered.current

    return {
        handlers: {
            onMouseDown: start,
            onMouseUp: clear,
            onMouseLeave: clear,
            onTouchStart: start,
            onTouchEnd: clear,
        },
        shouldPreventClick,
        pressing,
    }
}
