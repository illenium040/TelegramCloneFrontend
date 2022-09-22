import { useDeleteChatMutation } from "api/chat"
import WebSocketSignalR, { WSChatListEvents } from "common/websocket"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatView } from "pages/chat/types"

export const useContextMenuActions = () => {
    const user = useAuthContext()
    const [deleteChat] = useDeleteChatMutation()

    const remove = (view: ChatView) => {
        return deleteChat({
            chatId: view.chatId,
            userId: user.id
        })
            .unwrap()
            .then(x => {
                WebSocketSignalR.socket?.send(WSChatListEvents.Delete, view)
            })
    }
    const archive = () => {
        console.log("Archived")
    }
    const addToFolder = () => {
        console.log("Added to folder")
    }
    const block = () => {
        console.log("Blocked")
    }
    const clearStory = () => {
        console.log("Story is cleared")
    }
    const markAsUnread = () => {
        console.log("Marked as unread")
    }
    const turnOnNotifications = () => {
        console.log("Notifications are turned on")
    }
    const unpin = () => {
        console.log("Unpinned")
    }

    return { remove, archive, addToFolder, block, clearStory, markAsUnread, turnOnNotifications, unpin }
}
