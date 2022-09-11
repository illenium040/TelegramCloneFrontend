import { useContext, useState } from "react"
import { ChatListUnit } from "./models/chat"
import ChatWithUser from "./components/chat-with-user"
import SidebarChatList from "./components/sidebar-chat-list"
import { useConnectQuery } from "api/signalR"
import Loading from "pages/loading"
import { AppContext } from "pages/App"

const ChatContainer = () => {
    const user = useContext(AppContext)
    const { isLoading } = useConnectQuery(user.id)
    const [selectedChat, setSelectedChat] = useState<ChatListUnit | null>(null)

    const onChatSelected = (u: ChatListUnit) => {
        setSelectedChat(u)
    }
    if (isLoading) return <Loading />
    return (
        <>
            <SidebarChatList onChatSelected={onChatSelected} />
            {selectedChat && <ChatWithUser targetChat={selectedChat} />}
        </>
    )
}

export default ChatContainer
