import { useGetChatMessagesQuery, useReadMessageMutation, useSendMessageMutation } from "api/signalR"
import { UserDTO } from "common/models/user-models"
import { ChatView, MessageContentType, MessageState } from "pages/chat/types"
import { useEffect } from "react"
import { v4 } from "uuid"

export const useMessaging = (currentUser: UserDTO, targetChat: ChatView) => {
    const messageQuery = useGetChatMessagesQuery({ chatId: targetChat.chatId, userId: currentUser.id })
    const [sendMessage, sendState] = useSendMessageMutation()
    const [readMessage, readState] = useReadMessageMutation()
    useEffect(() => {
        if (messageQuery.isSuccess && !sendState.isLoading) {
            if (readState.isLoading) return
            const messages = messageQuery.data.data?.messages!
            const msgID = messages
                .filter(x => x.state === MessageState.SENDED_TO_USER && x.userIdFrom !== currentUser.id)
                .map(x => x.id)
            if (msgID.length === 0) return
            readMessage({
                chatId: targetChat.chatId,
                messagesId: msgID,
                userFromId: targetChat.user.id
            })
        }
    }, [messageQuery])

    const submitMessage = (val: string) => {
        if (!val) return
        sendMessage({
            chatId: targetChat.chatId,
            content: val,
            created: new Date(),
            userIdFrom: currentUser.id,
            userIdTo: targetChat.user.id,
            id: v4(),
            state: MessageState.LOADING,
            contentType: MessageContentType.Text
        })
    }
    return { submitMessage, messageQuery }
}
