import anime from "animejs"
import { ChatView, MessageDTO } from "pages/chat/types"
import { useEffect, useCallback, useState, createContext, useContext, useMemo, useRef } from "react"

export type MenuContext<T> = {
    elementClassName: string
    data: T | undefined
    width: number
    height: number
}

export const ChatListContext = createContext<MenuContext<ChatView[]>>({
    data: undefined,
    elementClassName: "",
    height: 300,
    width: 270
})

export const MessageContext = createContext<MenuContext<MessageDTO[]>>({
    data: undefined,
    elementClassName: "",
    height: 265,
    width: 180
})

export const useChatListCtxMenu = () => {
    const { data, elementClassName, height, width } = useContext(ChatListContext)
    const { anchorPoint, selectedId, show, menuRef } = useContextMenu(elementClassName, data, width, height)
    const selectedView = useMemo(() => data?.find(x => x.chatId === selectedId), [selectedId, data])

    return { anchorPoint, show, selectedView, menuRef }
}

export const useMessageCtxMenu = () => {
    const { data, elementClassName, height, width } = useContext(MessageContext)
    const { anchorPoint, selectedId, show, menuRef } = useContextMenu(elementClassName, data, width, height)
    const selectedMessage = useMemo(() => data?.find(x => x.id === selectedId), [selectedId, data])

    return { anchorPoint, show, selectedMessage, menuRef }
}

const useContextMenu = <T>(elementClassName: string, data: T, width: number, height: number) => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
    const [show, setShow] = useState(false)
    const [selectedId, setSelectedId] = useState("")

    const handleContextMenu = useCallback(
        (event: MouseEvent) => {
            event.preventDefault()
            if (show) return
            const x =
                window.innerWidth - event.pageX < width
                    ? window.innerWidth - width - (window.innerWidth - event.pageX)
                    : event.pageX
            const y =
                window.innerHeight - event.pageY < height
                    ? window.innerHeight - height - (window.innerHeight - event.pageY)
                    : event.pageY
            setAnchorPoint({ x: x, y: y })
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

    const menuRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        anime({
            targets: menuRef.current?.firstChild,
            width: {
                value: width,
                duration: 100,
                easing: "easeInSine"
            },
            height: {
                value: height,
                duration: 100,
                easing: "easeInSine"
            }
        })
        anime({
            targets: menuRef.current?.firstChild!.childNodes,
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
    return { anchorPoint, show, selectedId, menuRef }
}
