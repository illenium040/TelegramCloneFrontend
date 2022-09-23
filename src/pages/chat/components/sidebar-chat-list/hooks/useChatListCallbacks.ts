import { useAddChatMutation } from "api/chat"
import WebSocketSignalR, { WSChatListEvents } from "common/websocket"
import { ChatView } from "pages/chat/types"
import { useState } from "react"
import { useFeatures } from "./useFeatures"

export const useChatListCallbacks = (userId: string) => {
    const [addChat, addChatState] = useAddChatMutation()
    const [selectedChat, setSelectedChat] = useState<ChatView | null>(null)
    useFeatures({
        onEscapeKeyDown: () => setSelectedChat(null)
    })
    const onChatDeleted = (u: ChatView) => {
        if (u.chatId === selectedChat?.chatId) {
            setSelectedChat(null)
        }
    }

    const onChatSelected = async (u: ChatView) => {
        if (u.chatId.startsWith("search_")) {
            const result = await addChat({
                userId: userId,
                withUserId: u.user.id
            }).unwrap()
            if (result.succeeded) {
                u.chatId = result.data!
                await WebSocketSignalR.socket?.send(WSChatListEvents.Add, u)
            }
        }
        setSelectedChat(u)
    }

    return { onChatDeleted, onChatSelected, selectedChat }
}
