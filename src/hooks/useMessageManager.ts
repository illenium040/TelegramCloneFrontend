import { UserDTO } from '../models/user-models'
import { ChatListUnit, ChatDTO } from '../models/chat-models'
import { useEffect, useRef, useState } from 'react'
import { MessageDTO, MessageToServer } from '../models/message-models'
import { v4 as uuidv4 } from 'uuid'
import { useInjection } from './useInjection'

export const useMessages = (userIdTo: string) => {
    const { signalRService } = useInjection()
    //how to memo?
    const myMessages = useRef<MessageDTO[]>([])
    const receivedMessages = useRef<MessageDTO[]>([])
    useEffect(() => {
        signalRService.Hub?.on('MessageSended', (data: MessageDTO) => {
            myMessages.current.push(data)
        })
        signalRService.Hub?.on('ReceiveMessage', (data: MessageDTO) => {
            if (data.userIdFrom === userIdTo) {
                receivedMessages.current.push(data)
            }
        })
    }, [])
    return { myMessages, receivedMessages }
}

export const useMessageManager = (targetChat: ChatListUnit, chat: ChatDTO, currentUser: UserDTO) => {
    const [sendedMessages, setMessages] = useState(new Map<string, MessageToServer>())
    const { receivedMessages, myMessages } = useMessages(targetChat.user.id)

    const messageSended = (msgKey: string) => {
        sendedMessages.delete(msgKey)
        setMessages(new Map(sendedMessages))
    }

    const messageSubmitted = (value: string) => {
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

    function getTime(date?: Date) {
        const d = new Date(date!)
        try {
            return d != null ? d.getTime() : 0
        } catch (error) {
            console.log(error)
            return 0
        }
    }

    const sorted = receivedMessages.current
        .concat(myMessages.current)
        .sort((a, b) => getTime(a.created) - getTime(b.created))
    const messages = chat.messages.concat(sorted)

    return { messages, messageSended, messageSubmitted, sendedMessages }
}
