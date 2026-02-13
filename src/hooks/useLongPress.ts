import { useRef } from "react"

export function useLongPress(
    callback: () => void,
    delay = 450
) {
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const longPressTriggered = useRef(false)

    const start = () => {
        longPressTriggered.current = false

        timerRef.current = setTimeout(() => {
            callback()
            longPressTriggered.current = true
        }, delay)
    }

    const clear = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    const shouldPreventClick = () => {
        return longPressTriggered.current
    }

    return {
        handlers: {
            onMouseDown: start,
            onMouseUp: clear,
            onMouseLeave: clear,
            onTouchStart: start,
            onTouchEnd: clear,
        },
        shouldPreventClick,
    }
}
