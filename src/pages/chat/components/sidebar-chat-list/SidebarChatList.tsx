import "./sidebar-chat-list.css"
import { useGetChatListQuery } from "api/chat"
import { useAnimations } from "./hooks/useAnimations"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatSearch } from "./components/ChatSearch"
import { UserDTO } from "common/models/user-models"
import { ChatUser } from "./components/ChatUser"
import { useState } from "react"
import { Loading } from "pages/Loading"
import { ContextChatListMenu } from "pages/ContextMenu"
import { ChatViewType } from "./components/ChatUser/types"
import { ChatView } from "pages/chat/types"
import { SidebarChatListProps } from "./types"
import { ChatListContext } from "pages/ContextMenu/hooks/useContextMenu"
import { useContextMenuActions } from "./hooks/useContextMenuActions"

const SidebarChatList = (props: SidebarChatListProps) => {
    const user = useAuthContext()
    const { onChatSelected, onChatDeleted } = props
    const { addToFolder, archive, block, clearStory, markAsUnread, remove, turnOnNotifications, unpin } =
        useContextMenuActions()
    const { isFetching, data } = useGetChatListQuery(user.id)
    const { chatClick, chatListRef } = useAnimations()
    const [users, setUsers] = useState<UserDTO[]>([])

    const handleSearchData = (users: UserDTO[]) => {
        setUsers(users)
    }

    const handleChatUserClick = (unit: ChatView) => {
        chatClick.current.call(undefined)
        onChatSelected(unit)
    }

    return (
        <>
            <aside
                ref={chatListRef}
                className="dark:bg-dark-chat-unit-bg dark:text-gray-200
                group chat-sidebar-list chat-scrollbar shadow-lg shadow-black container-sm">
                <ChatSearch handleSearchData={handleSearchData} />
                {users.length > 0 &&
                    users.map((x, i) => {
                        return (
                            <ChatUser
                                chatType={ChatViewType.OnSearch}
                                key={x.id}
                                handleClick={handleChatUserClick}
                                unit={{
                                    chatId: `search_${i}`,
                                    unreadMessagesCount: 0,
                                    user: x,
                                    lastMessage: undefined
                                }}
                            />
                        )
                    })}
                {isFetching && <Loading />}
                {data &&
                    users.length === 0 &&
                    data.data?.map((x, i) => (
                        <ChatUser
                            chatType={ChatViewType.My}
                            key={x.chatId}
                            handleClick={handleChatUserClick}
                            unit={x}
                        />
                    ))}
            </aside>
            <ChatListContext.Provider
                value={{ data: data?.data, elementClassName: ChatViewType.My, height: 300, width: 270 }}>
                <ContextChatListMenu
                    onArchive={archive}
                    onAddToFolder={addToFolder}
                    onBlock={block}
                    onClearStory={clearStory}
                    onMarkAsUnread={markAsUnread}
                    onTurnOnNotifications={turnOnNotifications}
                    onUnpin={unpin}
                    onDelete={view => remove(view).then(x => onChatDeleted(view))}
                />
            </ChatListContext.Provider>
        </>
    )
}

export default SidebarChatList
