import { useEffect } from 'react'
import { ChatDTO, ChatListUnit } from '../../../models/chat-models'
import { MessageDTO } from '../../../models/message-models'
import { UserDTO } from '../../../models/user-models'
import { ChatFooter } from '../chat-footer'
import { Message } from './message'
import { MyMessage } from './my-message'
import { MessageFromClient } from './message-send'
import { scrollBottom } from '../../../extensions/global-extensions'
import { useMessageManager } from '../../../hooks/useMessageManager'

type MessageManagerProps = {
    chat: ChatDTO
    currentUser: UserDTO
    targetChat: ChatListUnit
}

export const MessageManager = (props: MessageManagerProps) => {
    const { chat, currentUser, targetChat } = props
    const { messages, messageSended, messageSubmitted, sendedMessages } = useMessageManager(
        targetChat,
        chat,
        currentUser
    )
    useEffect(() => {
        scrollBottom('.chat-body')
    })

    const createMessages = (x: MessageDTO) => {
        return x.userIdFrom === currentUser.id ? (
            <MyMessage key={x.id} avatar={currentUser.avatar} content={x.content} id={x.id} time={x.created} />
        ) : (
            <Message key={x.id} avatar={targetChat.user.avatar} content={x.content} id={x.id} time={x.created} />
        )
    }

    return (
        <>
            <div className="chat-body chat-scrollbar">
                <div className="chat-body-scrollable">
                    <div className="flex flex-col items-start p-2 justify-end">
                        <div className="chat-message-manager">
                            {messages?.map((x, i) => {
                                return createMessages(x)
                            })}
                            {Array.from(sendedMessages).map(([key, value]) => {
                                return (
                                    <MessageFromClient
                                        msgKey={key}
                                        message={value}
                                        user={currentUser}
                                        onSended={messageSended}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ChatFooter onMessageSubmit={messageSubmitted} />
        </>
    )
}
