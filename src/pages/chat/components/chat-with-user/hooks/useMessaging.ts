import { useTypedSelector } from "api"
import { useGetChatMessagesQuery, useReadMessageMutation, useSendMessageMutation } from "api/signalR"
import { UserDTO } from "common/models/user-models"
import { ChatListUnit } from "pages/chat/models/chat"
import { MessageContentType, MessageState } from "pages/chat/models/message"
import { useEffect, useMemo } from "react"
import { v4 } from "uuid"

export const useMessaging = (currentUser: UserDTO, targetChat: ChatListUnit) => {
    const messageQuery = useGetChatMessagesQuery({ chatId: targetChat.chatId, userId: currentUser.id })
    const [sendMessage, sendState] = useSendMessageMutation()
    const [readMessage, readState] = useReadMessageMutation()
    const loadable = useTypedSelector(state => state.loadable)
    const loadableMessages = useMemo(() => loadable.filter(x => x.chatId === targetChat.chatId), [loadable])

    useEffect(() => {
        if (messageQuery.isSuccess && !sendState.isLoading) {
            if (readState.isLoading) return
            const messages = messageQuery.data.data?.messages!
            const msgID = messages
                .filter(x => x.state === MessageState.SENDED_TO_USER && x.userIdFrom !== currentUser.id)
                .map(x => x.id)
            if (msgID.length === 0) return
            console.log("read")
            readMessage({
                chatId: targetChat.chatId,
                messagesId: msgID,
                userFromId: targetChat.user.id
            })
        }
    }, [messageQuery.data])

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
    return { submitMessage, messageQuery, loadableMessages }
}
