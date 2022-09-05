import { useEffect } from 'react'
import { ChatDTO, ChatListUnit } from '../../models/chat'
import { MessageDTO } from '../../models/message'
import { UserDTO } from '../../../../common/models/user-models'
import { ChatFooter } from '../chat-with-user-footer'
import { scrollBottom } from '../../../../common/extensions/global-extensions'
import { useMessageManager } from './hooks/useMessageManager'
import Message from '../chat-message'
import MyMessage from '../chat-my-message'
import MessageFromClient from '../chat-message-sended'

type MessageManagerProps = {
    chat: ChatDTO
    currentUser: UserDTO
    targetChat: ChatListUnit
}

const MessageManager = (props: MessageManagerProps) => {
    const { chat, currentUser, targetChat } = props
    const { messages, sendedMessages, handlers } = useMessageManager(targetChat, chat, currentUser)
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
                                        onSended={handlers.messageSended}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ChatFooter onMessageSubmit={handlers.messageSubmitted} />
        </>
    )
}

export default MessageManager
