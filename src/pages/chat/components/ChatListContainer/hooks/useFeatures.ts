import { useEffect } from "react"

export const useFeatures = (props: { onEscapeKeyDown?: () => void }) => {
    const { onEscapeKeyDown } = props
    const escapeKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            if (onEscapeKeyDown) onEscapeKeyDown()
        }
    }
    useEffect(() => {
        if (onEscapeKeyDown) document.addEventListener("keydown", escapeKeyDown)
        return () => {
            document.removeEventListener("keydown", escapeKeyDown)
        }
    }, [])
}
