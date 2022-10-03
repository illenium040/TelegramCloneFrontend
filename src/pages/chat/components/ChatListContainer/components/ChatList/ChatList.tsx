import { AiOutlinePushpin } from "@react-icons/all-files/ai/AiOutlinePushpin"
import { BiArchiveIn } from "@react-icons/all-files/bi/BiArchiveIn"
import { BsFillFolderSymlinkFill } from "@react-icons/all-files/bs/BsFillFolderSymlinkFill"
import { FiMessageCircle } from "@react-icons/all-files/fi/FiMessageCircle"
import { FiTrash } from "@react-icons/all-files/fi/FiTrash"
import { GiBroom } from "@react-icons/all-files/gi/GiBroom"
import { IoMdVolumeOff } from "@react-icons/all-files/io/IoMdVolumeOff"
import { IoHandRight } from "@react-icons/all-files/io5/IoHandRight"
import anime from "animejs"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { useChatContext } from "pages/chat/ChatContainer"
import { ChatView } from "pages/chat/types"
import { useCallback, useEffect, useRef, useState } from "react"
import { useContextMenuActions } from "../../hooks/useContextMenuActions"
import { usePin } from "../../hooks/usePin"
import { ChatViewComponent } from "../ChatViewComponent"
import { ChatViewType } from "../ChatViewComponent/types"

const useContextMenu = (view: ChatView) => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
    const [show, setShow] = useState(false)
    const menuRef = useRef<HTMLUListElement>(null)
    const handleContextMenu = useCallback(
        (event: MouseEvent) => {
            event.preventDefault()
            if (show) return
            setAnchorPoint({ x: event.pageX, y: event.pageY })
            setShow(true)
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
        document.getElementById(view.chatId)?.addEventListener("contextmenu", handleContextMenu)
        return () => {
            document.removeEventListener("click", handleClick)
            document.getElementById(view.chatId)?.removeEventListener("contextmenu", handleContextMenu)
        }
    })
    return { show, menuRef }
}

const ContextMenu = (props: { view: ChatView; isFavorite: boolean }) => {
    const { view, isFavorite } = props
    const { onChatDeleted } = useChatContext()
    const { show, menuRef } = useContextMenu(view)
    const { pin, remove } = useContextMenuActions()
    if (show) {
        const { isArchived, isBlocked, isNotified, isPinned } = view?.chatToUser
        return (
            <div className="menu-container" id="menu-container">
                <ul ref={menuRef} className="menu">
                    {!isFavorite && (
                        <li>
                            <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                            <p>{isArchived ? "Разархивировать" : "Архивировать"}</p>
                        </li>
                    )}
                    <li onClick={() => pin(view)}>
                        <AiOutlinePushpin className="mr-5 w-[20px] h-[20px]" />
                        <p>{isPinned ? "Открепить" : "Закрепить"}</p>
                    </li>
                    {!isFavorite && (
                        <li>
                            <IoMdVolumeOff className="mr-5 w-[20px] h-[20px]" />
                            <span>{isNotified ? "Выключить уведомления" : "Включить уведомления"}</span>
                        </li>
                    )}
                    <li>
                        <FiMessageCircle className="mr-5 w-[20px] h-[20px]" />
                        <span>Пометить как непрочитанное</span>
                    </li>
                    <li>
                        <BsFillFolderSymlinkFill className="mr-5 w-[20px] h-[20px]" />
                        <p>Добавить в папку</p>
                    </li>
                    {!isFavorite && (
                        <li>
                            <IoHandRight className="mr-5 w-[20px] h-[20px]" />
                            <p>{isBlocked ? "Разблокировать" : "Заблокировать"}</p>
                        </li>
                    )}
                    <li>
                        <GiBroom className="mr-5 w-[20px] h-[20px]" />
                        <p>Очистить историю</p>
                    </li>
                    <li onClick={() => remove(view).then(() => onChatDeleted(view))} className="text-red-500">
                        <FiTrash className="mr-5 w-[20px] h-[20px]" />
                        <p>Удалить</p>
                    </li>
                </ul>
            </div>
        )
    }
    return <></>
}

export const ChatList = (props: { handleClick: (view: ChatView) => void; views: ChatView[] }) => {
    const user = useAuthContext()
    const { handleClick, views } = props
    const { pinnedViews } = usePin(views)
    return (
        <>
            {pinnedViews.map((x, i) => (
                <div key={i}>
                    <ChatViewComponent chatType={ChatViewType.My} key={x.chatId} handleClick={handleClick} unit={x} />
                    <ContextMenu key={x.user.id} view={x} isFavorite={x.user.id === user.id} />
                </div>
            ))}
        </>
    )
}
