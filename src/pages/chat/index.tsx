import { useState } from "react"
import { ChatListUnit } from "./models/chat"
import ChatWithUser from "./components/chat-with-user"
import SidebarChatList from "./components/sidebar-chat-list"
import { useConnectQuery } from "api/signalR"
import Loading from "pages/loading"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { useAddChatMutation } from "api/chat"

const ChatContainer = () => {
    const user = useAuthContext()
    const { isLoading } = useConnectQuery(user.id)
    const [selectedChat, setSelectedChat] = useState<ChatListUnit | null>(null)
    const [addChat, addChatState] = useAddChatMutation()

    const onChatSelected = async (u: ChatListUnit) => {
        if (u.chatId.startsWith("search_")) {
            const result = await addChat({
                userId: user.id,
                withUserId: u.user.id
            }).unwrap()
            if (result.succeeded) {
                u.chatId = result.data!
            }
        }
        setSelectedChat(u)
    }

    if (isLoading) return <Loading />
    return (
        <>
            <SidebarChatList onChatSelected={onChatSelected} />
            {addChatState.isLoading && <Loading />}
            {selectedChat && <ChatWithUser targetChat={selectedChat} />}
        </>
    )
}

export default ChatContainer
