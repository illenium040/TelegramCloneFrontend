import { getTime } from 'common/extensions/global-extensions'
import { useInjection } from 'common/hooks/useInjection'
import { UserDTO } from 'common/models/user-models'
import { ChatDTO, ChatListUnit } from 'pages/chat/models/chat'
import { MessageDTO, MessageToServer } from 'pages/chat/models/message'
import { useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useMessages = (userIdTo: string) => {
    const { signalRService } = useInjection()
    const myMessages = useRef<MessageDTO[]>([])
    const receivedMessages = useRef<MessageDTO[]>([])
    const [sendedMessage, setSended] = useState<MessageDTO>()
    const [receivedMessage, setReceived] = useState<MessageDTO>()
    useEffect(() => {
        signalRService.Hub?.on('MessageSended', (data: MessageDTO) => {
            myMessages.current.push(data)
            setSended(data)
        })
        signalRService.Hub?.on('ReceiveMessage', (data: MessageDTO) => {
            if (data.userIdFrom === userIdTo) {
                receivedMessages.current.push(data)
                setReceived(data)
            }
        })
    }, [])
    return { myMessages, receivedMessages }
}

export const useMessageManager = (targetChat: ChatListUnit, chat: ChatDTO, currentUser: UserDTO) => {
    const [sendedMessages, setMessages] = useState(new Map<string, MessageToServer>())
    const { receivedMessages, myMessages } = useMessages(targetChat.user.id)

    const handlers = useMemo(
        () => ({
            messageSended: (msgKey: string) => {
                sendedMessages.delete(msgKey)
                setMessages(new Map(sendedMessages))
            },
            messageSubmitted: (value: string) => {
                setMessages(
                    new Map(
                        sendedMessages.set(uuidv4(), {
                            chatId: chat.id,
                            content: value,
                            userIdFrom: currentUser.id,
                            userIdTo: targetChat.user.id
                        })
                    )
                )
            }
        }),
        []
    )

    const sorted = receivedMessages.current
        .concat(myMessages.current)
        .sort((a, b) => getTime(a.created) - getTime(b.created))
    const messages = chat.messages.concat(sorted)

    return { messages, handlers, sendedMessages }
}
