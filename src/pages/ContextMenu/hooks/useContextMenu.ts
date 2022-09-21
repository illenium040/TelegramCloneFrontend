import { ChatViewType } from "pages/chat/components/sidebar-chat-list/components/ChatUser/types"
import { useEffect, useCallback, useState } from "react"

const useContextMenu = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState<HTMLElement>()
    const findCU = (targets: EventTarget[]) => {
        const values = document.getElementsByClassName(ChatViewType.My)
        for (const val of values) {
            const index = targets.findIndex(x => (x as Element) === val)
            if (index !== -1) return targets[index]
        }
        return undefined
    }

    const handleContextMenu = useCallback(
        (event: MouseEvent) => {
            event.preventDefault()
            if (show) return
            const element = findCU(event.composedPath())
            if (!element) return
            const x = window.innerWidth - event.pageX < 270 ? window.innerWidth - 270 : event.pageX
            const y = window.innerHeight - event.pageY < 300 ? window.innerHeight - 300 : event.pageY
            setAnchorPoint({ x: x, y: y })
            setShow(true)
            setSelected(element as HTMLElement)
        },
        [setShow, setAnchorPoint, show]
    )

    const handleClick = useCallback(() => (show ? setShow(false) : null), [show])

    useEffect(() => {
        document.addEventListener("click", handleClick)
        document.addEventListener("contextmenu", handleContextMenu)
        return () => {
            document.removeEventListener("click", handleClick)
            document.removeEventListener("contextmenu", handleContextMenu)
        }
    })
    return { anchorPoint, show, selected }
}

export default useContextMenu
