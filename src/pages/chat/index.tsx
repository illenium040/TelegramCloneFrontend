import { useState } from "react"
import { UserDTO } from "common/models/user-models"
import { ChatListUnit } from "./models/chat"
import ChatWithUser from "./components/chat-with-user"
import SidebarChatList from "./components/sidebar-chat-list"
import { useConnectQuery } from "api/signalR"
import Loading from "pages/loading"

type ChatContainerProps = {
    user: UserDTO
}

const ChatContainer = (props: ChatContainerProps) => {
    const { user } = props
    const { isLoading } = useConnectQuery(user.id)
    const [selectedChat, setSelectedChat] = useState<ChatListUnit | null>(null)

    const onChatSelected = (u: ChatListUnit) => {
        setSelectedChat(u)
    }
    if (isLoading) return <Loading />
    return (
        <>
            <SidebarChatList user={user} onChatSelected={onChatSelected} />
            {selectedChat && <ChatWithUser currentUser={user} targetChat={selectedChat} />}
        </>
    )
}

export default ChatContainer
