import anime from "animejs"
import { ChatView, MessageDTO } from "pages/chat/types"
import { useEffect, useCallback, useState, createContext, useContext, useMemo, useRef } from "react"
export type MenuContext<T> = {
    elementClassName: string
    data: T | undefined
}

export const ChatListContext = createContext<MenuContext<ChatView[]>>({
    data: undefined,
    elementClassName: ""
})

export const MessageContext = createContext<MenuContext<MessageDTO[]>>({
    data: undefined,
    elementClassName: ""
})

export const useChatListCtxMenu = () => {
    const { data, elementClassName } = useContext(ChatListContext)
    const { selectedId, show, menuRef } = useContextMenu(elementClassName)
    const selectedView = useMemo(() => data?.find(x => x.chatId === selectedId), [selectedId, data])

    return { show, selectedView, menuRef }
}

export const useMessageCtxMenu = () => {
    const { data, elementClassName } = useContext(MessageContext)
    const { selectedId, show, menuRef } = useContextMenu(elementClassName)
    const selectedMessage = useMemo(() => data?.find(x => x.id === selectedId), [selectedId, data])

    return { show, selectedMessage, menuRef }
}

const useContextMenu = (elementClassName: string) => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
    const [show, setShow] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const menuRef = useRef<HTMLUListElement>(null)
    const handleContextMenu = useCallback(
        (event: MouseEvent) => {
            event.preventDefault()
            if (show) return
            setAnchorPoint({ x: event.pageX, y: event.pageY })
            setShow(true)
            setSelectedId((event.currentTarget as HTMLElement).id)
        },
        [setShow, setAnchorPoint, show]
    )

    const handleClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation()
            return show ? setShow(false) : null
        },
        [show]
    )

    useEffect(() => {
        if (!show) return
        const height = menuRef.current?.clientHeight!
        const width = menuRef.current?.clientWidth!
        const x =
            window.innerWidth - anchorPoint.x < width
                ? window.innerWidth - width - (window.innerWidth - anchorPoint.x)
                : anchorPoint.x
        const y =
            window.innerHeight - anchorPoint.y < height
                ? window.innerHeight - height - (window.innerHeight - anchorPoint.y)
                : anchorPoint.y

        anime({
            targets: menuRef.current,
            width: {
                value: [0, width],
                duration: 100,
                easing: "easeInSine"
            },
            height: {
                value: [0, height],
                duration: 100,
                easing: "easeInSine"
            },
            top: {
                value: y,
                duration: 0
            },
            left: {
                value: x,
                duration: 0
            }
        })
        anime({
            targets: menuRef.current?.childNodes,
            opacity: {
                value: 100,
                delay: 100,
                duration: 100,
                easing: "easeInSine"
            }
        })
    }, [show])

    useEffect(() => {
        document.addEventListener("click", handleClick)
        for (const el of document.getElementsByClassName(elementClassName))
            (el as HTMLElement).addEventListener("contextmenu", handleContextMenu)
        return () => {
            document.removeEventListener("click", handleClick)
            for (const el of document.getElementsByClassName(elementClassName))
                (el as HTMLElement).removeEventListener("contextmenu", handleContextMenu)
        }
    })
    return { show, selectedId, menuRef }
}
