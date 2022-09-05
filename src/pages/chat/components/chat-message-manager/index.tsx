import { useEffect } from 'react'
import { useMessageManager } from './hooks/useMessageManager'
import Message from '../chat-message'
import MyMessage from '../chat-my-message'
import MessageFromClient from '../chat-message-sended'
import { ChatDTO, ChatListUnit } from 'pages/chat/models/chat'
import { UserDTO } from 'common/models/user-models'
import { scrollBottom } from 'common/extensions/global-extensions'
import { MessageDTO } from 'pages/chat/models/message'
import ChatFooter from '../chat-with-user-footer'
import { useGetChatMessagesQuery, useSendMessageMutation } from 'api/signalR'
import Loading from 'pages/loading'

type MessageManagerProps = {
    currentUser: UserDTO
    targetChat: ChatListUnit
}

const MessageManager = (props: MessageManagerProps) => {
    const { currentUser, targetChat } = props
    //const { messages, sendedMessages, handlers } = useMessageManager(targetChat, chat, currentUser)
    const { data, isLoading } = useGetChatMessagesQuery({ chatId: targetChat.chatId, userId: currentUser.id })
    const [sendMessage, state] = useSendMessageMutation()

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
    if (isLoading) return <Loading />

    return (
        <>
            <div className="chat-body chat-scrollbar">
                <div className="chat-body-scrollable">
                    <div className="flex flex-col items-start p-2 justify-end">
                        <div className="chat-message-manager">
                            {data?.messages.map((x, i) => {
                                return createMessages(x)
                            })}
                            {/* {Array.from(sendedMessages).map(([key, value]) => {
                                return (
                                    <MessageFromClient
                                        msgKey={key}
                                        message={value}
                                        user={currentUser}
                                        onSended={handlers.messageSended}
                                    />
                                )
                            })} */}
                        </div>
                    </div>
                </div>
            </div>
            <ChatFooter
                onMessageSubmit={val =>
                    sendMessage({
                        chatId: targetChat.chatId,
                        content: val,
                        userIdFrom: currentUser.id,
                        userIdTo: targetChat.user.id
                    })
                }
            />
        </>
    )
}

export default MessageManager
