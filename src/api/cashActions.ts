import { ChatView, MessageDTO } from "pages/chat/types"
import { chatApi } from "./chat"
import { QueryInput } from "./common-api-types"
import { signalRApi } from "./signalR"

export const decreaseUnreadMessageCounter = (userId: string, chatId: string, targetUserId: string, value: number) => {
    return chatApi.util.updateQueryData("getChatList", userId, d => {
        const chatView = d.data?.find(x => x.chatId === chatId)
        if (chatView && targetUserId === chatView.user.id) {
            chatView.unreadMessagesCount -= value
        }
    })
}

export const increaseUnreadMessageCounter = (userId: string, chatId: string, targetUserId: string, value: number) => {
    return chatApi.util.updateQueryData("getChatList", userId, d => {
        const chatView = d.data?.find(x => x.chatId === chatId)
        if (chatView && targetUserId === chatView.user.id) {
            chatView.unreadMessagesCount += value
        }
    })
}

export const updateChatListData = (
    query: QueryInput,
    action: (view: ChatView, data?: ChatView[], index?: number) => void
) => {
    return chatApi.util.updateQueryData("getChatList", query.userId, d => {
        if (!d.data) return
        const c = d.data?.findIndex(x => x.chatId === query.chatId)
        if (c > -1) {
            action(d.data[c], d.data, c)
        }
    })
}

export const updateMessagesCash = (message: MessageDTO, action: (message: MessageDTO) => void, arg?: QueryInput) => {
    const args = arg ?? ({ userId: message.userIdFrom, chatId: message.chatId } as QueryInput)
    return signalRApi.util.updateQueryData("getChatMessages", args, d => {
        const msg = d.data?.messages.find(x => x.id === message.id)
        if (msg) action(msg)
        else {
            d.data?.messages.push(message)
            action(message)
        }
    })
}
