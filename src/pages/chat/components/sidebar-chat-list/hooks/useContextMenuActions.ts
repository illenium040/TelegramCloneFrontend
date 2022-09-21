import { useDeleteChatMutation } from "api/chat"
import WebSocketSignalR, { WSChatListEvents } from "common/websocket"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatView } from "pages/chat/types"
import { SidebarChatListProps } from "../types"

export const useContextMenuActions = (props: SidebarChatListProps, data: ChatView[]) => {
    const { onChatDeleted, onChatSelected } = props
    const [deleteChat, deleteChatState] = useDeleteChatMutation()
    const user = useAuthContext()
    const handleDeletion = async (element: HTMLElement) => {
        const id = element.id
        const index = data.findIndex(x => x.chatId === id)
        if (index === -1) {
            console.log("There is no any chat")
            return
        }
        const c = data[index!]
        deleteChat({
            chatId: c?.chatId!,
            userId: user.id
        })
            .unwrap()
            .then(x => {
                WebSocketSignalR.socket?.send(WSChatListEvents.Delete, c)
                onChatDeleted(c!)
            })
    }

    return { handleDeletion }
}
