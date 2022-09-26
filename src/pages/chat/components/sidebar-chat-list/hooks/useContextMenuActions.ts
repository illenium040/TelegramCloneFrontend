import { useArchiveChatMutation, useDeleteChatMutation } from "api/chat"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatView } from "pages/chat/types"

export const useContextMenuActions = () => {
    const user = useAuthContext()
    const [deleteChat] = useDeleteChatMutation()
    const [archiveChat] = useArchiveChatMutation()
    const remove = (view: ChatView) => {
        return deleteChat({
            chatId: view.chatId,
            userId: user.id
        }).unwrap()
    }
    const archive = (view: ChatView) => {
        return archiveChat({
            chatId: view.chatId,
            userId: user.id
        }).unwrap()
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
