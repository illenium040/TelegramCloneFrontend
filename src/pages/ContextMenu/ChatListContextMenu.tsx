import "./ContextMenu.css"
import { useEffect, useRef } from "react"
import { useChatListCtxMenu } from "./hooks/useContextMenu"
import anime from "animejs"
import { BiArchiveIn } from "@react-icons/all-files/bi/BiArchiveIn"
import { AiOutlinePushpin } from "@react-icons/all-files/ai/AiOutlinePushpin"
import { IoMdVolumeOff } from "@react-icons/all-files/io/IoMdVolumeOff"
import { FiMessageCircle } from "@react-icons/all-files/fi/FiMessageCircle"
import { BsFillFolderSymlinkFill } from "@react-icons/all-files/bs/BsFillFolderSymlinkFill"
import { IoHandRight } from "@react-icons/all-files/io5/IoHandRight"
import { GiBroom } from "@react-icons/all-files/gi/GiBroom"
import { FiTrash } from "@react-icons/all-files/fi/FiTrash"
import { ChatView } from "pages/chat/types"

type ContextChatListMenuProps = {
    onArchive: (view: ChatView) => void
    onUnpin: (view: ChatView) => void
    onTurnOnNotifications: (view: ChatView) => void
    onMarkAsUnread: (view: ChatView) => void
    onAddToFolder: (view: ChatView) => void
    onBlock: (view: ChatView) => void
    onDelete: (view: ChatView) => void
    onClearStory: (view: ChatView) => void
}

export const ChatListContextMenu = (props: ContextChatListMenuProps) => {
    const {
        onDelete,
        onClearStory,
        onAddToFolder,
        onArchive,
        onBlock,
        onMarkAsUnread,
        onTurnOnNotifications,
        onUnpin
    } = props
    const { anchorPoint, show, selectedView, menuRef } = useChatListCtxMenu()

    if (show) {
        return (
            <div ref={menuRef} className="menu-container" id="menu-container">
                <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
                    <li onClick={e => selectedView && onArchive(selectedView)}>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                    <li onClick={e => selectedView && onUnpin(selectedView)}>
                        <AiOutlinePushpin className="mr-5 w-[20px] h-[20px]" />
                        <p>Закрепить</p>
                    </li>
                    <li onClick={e => selectedView && onTurnOnNotifications(selectedView)}>
                        <IoMdVolumeOff className="mr-5 w-[20px] h-[20px]" />
                        <p>Выключить уведомления</p>
                    </li>
                    <li onClick={e => selectedView && onMarkAsUnread(selectedView)}>
                        <FiMessageCircle className="mr-5 w-[20px] h-[20px]" />
                        <p>Пометить как непрочитанное</p>
                    </li>
                    <li onClick={e => selectedView && onAddToFolder(selectedView)}>
                        <BsFillFolderSymlinkFill className="mr-5 w-[20px] h-[20px]" />
                        <p>Добавить в папку</p>
                    </li>
                    <li onClick={e => selectedView && onBlock(selectedView)}>
                        <IoHandRight className="mr-5 w-[20px] h-[20px]" />
                        <p>Заблокировать</p>
                    </li>
                    <li onClick={e => selectedView && onClearStory(selectedView)}>
                        <GiBroom className="mr-5 w-[20px] h-[20px]" />
                        <p>Очистить историю</p>
                    </li>
                    <li onClick={e => selectedView && onDelete(selectedView)} className="text-red-500">
                        <FiTrash className="mr-5 w-[20px] h-[20px]" />
                        <p>Удалить</p>
                    </li>
                </ul>
            </div>
        )
    }
    return <></>
}
