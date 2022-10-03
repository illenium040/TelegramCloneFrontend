import {
    useArchiveChatMutation,
    useBlockMutation,
    useDeleteChatMutation,
    useToggleNotificationsMutation,
    useTogglePinMutation
} from "api/chat"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatView } from "pages/chat/types"

export const useContextMenuActions = () => {
    const user = useAuthContext()
    const [deleteChat] = useDeleteChatMutation()
    const [archiveChat] = useArchiveChatMutation()
    const [togglePin] = useTogglePinMutation()
    const [toggleBlock] = useBlockMutation()
    const [toggleNotifications] = useToggleNotificationsMutation()

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
    const block = (view: ChatView) => {
        return toggleBlock({
            chatId: view.chatId,
            userId: user.id
        }).unwrap()
    }
    const clearStory = () => {
        console.log("Story is cleared")
    }
    const markAsUnread = () => {
        console.log("Marked as unread")
    }
    const notification = (view: ChatView) => {
        return toggleNotifications({
            chatId: view.chatId,
            userId: user.id
        }).unwrap()
    }
    const unpin = (view: ChatView) => {
        return togglePin({
            chatId: view.chatId,
            userId: user.id
        }).unwrap()
    }

    return { remove, archive, addToFolder, block, clearStory, markAsUnread, notification, unpin }
}
