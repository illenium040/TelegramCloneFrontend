import "./sidebar-chat-list.css"
import { useAnimations } from "./hooks/useAnimations"
import { ChatSearch } from "./components/ChatSearch"
import { UserDTO } from "common/models/user-models"
import { ChatViewComponent } from "./components/ChatViewComponent"
import { useState } from "react"
import { ChatViewType } from "./components/ChatViewComponent/types"
import { ChatView } from "pages/chat/types"
import { SidebarChatListProps } from "./types"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { createEmptyChatView } from "common/extensions/dto-extensions"

export const SidebarChatList = (props: SidebarChatListProps) => {
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
        const values = views.filter(
            view =>
                view.user.name.toLowerCase().indexOf(value.toLocaleLowerCase()) >= 0 &&
                !view.chatId.startsWith("search")
        )
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
                {users.length === 0 &&
                    views.map((x, i) => (
                        <ChatViewComponent
                            chatType={ChatViewType.My}
                            key={x.chatId}
                            handleClick={handleChatUserClick}
                            unit={x}
                        />
                    ))}
                {users.length > 0 &&
                    myChats.length > 0 &&
                    myChats.map((x, i) => (
                        <ChatViewComponent
                            chatType={ChatViewType.My}
                            key={x.chatId}
                            handleClick={handleChatUserClick}
                            unit={x}
                        />
                    ))}
                {users.length > 0 && (
                    <div className="border-t-2 border-black">
                        {users.map((x, i) => (
                            <ChatViewComponent
                                chatType={ChatViewType.OnSearch}
                                key={x.id}
                                handleClick={handleChatUserClick}
                                unit={createEmptyChatView(x, `search_${i}`)}
                            />
                        ))}
                    </div>
                )}
            </aside>
        </>
    )
}
