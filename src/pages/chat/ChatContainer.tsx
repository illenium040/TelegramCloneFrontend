import { useState } from "react"
import ChatWithUser from "./components/chat-with-user"
import { useConnectQuery } from "api/signalR"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { useAddChatMutation } from "api/chat"
import WebSocketSignalR, { WSChatListEvents } from "common/websocket"
import SidebarChatList from "./components/sidebar-chat-list"
import { ChatView } from "./types"
import { Loading } from "pages/Loading"

const ChatContainer = () => {
    const user = useAuthContext()
    const { isLoading } = useConnectQuery(user.id)
    const [selectedChat, setSelectedChat] = useState<ChatView | null>(null)
    const [addChat, addChatState] = useAddChatMutation()

    const onChatDeleted = (u: ChatView) => {
        if (u.chatId === selectedChat?.chatId) {
            setSelectedChat(null)
        }
    }

    const onChatSelected = async (u: ChatView) => {
        if (u.chatId.startsWith("search_")) {
            const result = await addChat({
                userId: user.id,
                withUserId: u.user.id
            }).unwrap()
            if (result.succeeded) {
                u.chatId = result.data!
                await WebSocketSignalR.socket?.send(WSChatListEvents.Add, u)
            }
        }
        setSelectedChat(u)
    }

    if (isLoading) return <Loading />
    return (
        <>
            <SidebarChatList onChatSelected={onChatSelected} onChatDeleted={onChatDeleted} />
            {addChatState.isLoading && <Loading />}
            {selectedChat && <ChatWithUser targetChat={selectedChat} />}
        </>
    )
}

export default ChatContainer
