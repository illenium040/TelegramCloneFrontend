import "./ContextMenu.css"
import { useChatListCtxMenu } from "./hooks/useContextMenu"
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
    const { show, selectedView, menuRef } = useChatListCtxMenu()

    if (show && selectedView) {
        const { isArchived, isBlocked, isNotified, isPinned } = selectedView?.chatToUser
        return (
            <div className="menu-container" id="menu-container">
                <ul ref={menuRef} className="menu">
                    <li onClick={e => selectedView && onArchive(selectedView)}>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>{isArchived ? "Разархивировать" : "Архивировать"}</p>
                    </li>
                    <li onClick={e => selectedView && onUnpin(selectedView)}>
                        <AiOutlinePushpin className="mr-5 w-[20px] h-[20px]" />
                        <p>{isPinned ? "Открепить" : "Закрепить"}</p>
                    </li>
                    <li onClick={e => selectedView && onTurnOnNotifications(selectedView)}>
                        <IoMdVolumeOff className="mr-5 w-[20px] h-[20px]" />
                        <span>{isNotified ? "Выключить уведомления" : "Включить уведомления"}</span>
                    </li>
                    <li onClick={e => selectedView && onMarkAsUnread(selectedView)}>
                        <FiMessageCircle className="mr-5 w-[20px] h-[20px]" />
                        <span>Пометить как непрочитанное</span>
                    </li>
                    <li onClick={e => selectedView && onAddToFolder(selectedView)}>
                        <BsFillFolderSymlinkFill className="mr-5 w-[20px] h-[20px]" />
                        <p>Добавить в папку</p>
                    </li>
                    <li onClick={e => selectedView && onBlock(selectedView)}>
                        <IoHandRight className="mr-5 w-[20px] h-[20px]" />
                        <p>{isBlocked ? "Разблокировать" : "Заблокировать"}</p>
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
