import "./sidebar-chat-list.css"
import { useDeleteChatMutation, useGetChatListQuery } from "api/chat"
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
import { useContextMenuActions } from "./hooks/useContextMenuActions"

const SidebarChatList = (props: SidebarChatListProps) => {
    const user = useAuthContext()
    const { onChatSelected } = props
    const { isFetching, data } = useGetChatListQuery(user.id)
    const { handleDeletion } = useContextMenuActions(props, data?.data!)
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
                        const unit = {
                            chatId: `search_${i}`,
                            unreadMessagesCount: 0,
                            user: x,
                            lastMessage: undefined
                        }
                        return (
                            <ChatUser
                                chatType={ChatViewType.OnSearch}
                                key={x.id}
                                handleClick={() => handleChatUserClick(unit)}
                                unit={unit}
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
                            handleClick={() => handleChatUserClick(x)}
                            unit={x}
                        />
                    ))}
            </aside>
            <ContextChatListMenu onDelete={handleDeletion} />
        </>
    )
}

export default SidebarChatList
