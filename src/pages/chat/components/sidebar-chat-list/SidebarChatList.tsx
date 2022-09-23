import "./sidebar-chat-list.css"
import { useAnimations } from "./hooks/useAnimations"
import { ChatSearch } from "./components/ChatSearch"
import { UserDTO } from "common/models/user-models"
import { ChatUser } from "./components/ChatUser"
import { useState } from "react"
import { ChatViewType } from "./components/ChatUser/types"
import { ChatView } from "pages/chat/types"
import { SidebarChatListProps } from "./types"
import { useAuthContext } from "pages/Auth/hooks/useAuth"

const SidebarChatList = (props: SidebarChatListProps) => {
    const { onChatSelected, views } = props
    const user = useAuthContext()
    const { chatClick, chatListRef } = useAnimations()
    const [users, setUsers] = useState<UserDTO[]>([])
    const [myChats, setMyChats] = useState<ChatView[]>(views)

    const handleSearchData = (users: UserDTO[]) => {
        const filtered = users.filter(user => views.findIndex(view => view.user.id === user.id) === -1)
        const myIndex = filtered.findIndex(x => x.id === user.id)
        if (myIndex !== -1) filtered.splice(myIndex, 1)
        setUsers(filtered)
    }

    const handleSearchInput = (value: string) => {
        if (!value) {
            setMyChats(views)
            return
        }
        const values = views.filter(view => view.user.name.toLowerCase().indexOf(value.toLocaleLowerCase()) >= 0)
        setMyChats(values)
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
                <ChatSearch handleSearchInput={handleSearchInput} handleSearchData={handleSearchData} />

                {myChats.map((x, i) => (
                    <ChatUser chatType={ChatViewType.My} key={x.chatId} handleClick={handleChatUserClick} unit={x} />
                ))}
                {users.length > 0 && (
                    <div className="border-t-2 border-black">
                        {users.map((x, i) => (
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
                        ))}
                    </div>
                )}
            </aside>
        </>
    )
}

export default SidebarChatList
