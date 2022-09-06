import React, { useEffect, useRef, useState } from "react"
import Message from "../chat-message"
import MyMessage from "../chat-my-message"
import { ChatListUnit } from "pages/chat/models/chat"
import { UserDTO } from "common/models/user-models"
import { scrollBottom } from "common/extensions/global-extensions"
import { MessageDTO } from "pages/chat/models/message"
import ChatFooter from "../chat-with-user-footer"
import { useGetChatMessagesQuery, useSendMessageMutation } from "api/signalR"
import Loading from "pages/loading"
import { v4 } from "uuid"

type MessageManagerProps = {
    currentUser: UserDTO
    targetChat: ChatListUnit
}

const createMessages = (x: MessageDTO, currentUser: UserDTO, targetUser: UserDTO) => {
    return x.userIdFrom === currentUser.id ? (
        <MyMessage key={x.id} avatar={currentUser.avatar} content={x.content} id={x.id} time={x.created} />
    ) : (
        <Message key={x.id} avatar={targetUser.avatar} content={x.content} id={x.id} time={x.created} />
    )
}

const MessageManager = (props: MessageManagerProps) => {
    const { currentUser, targetChat } = props
    //const { messages, sendedMessages, handlers } = useMessageManager(targetChat, chat, currentUser)
    const { data, isLoading } = useGetChatMessagesQuery({ chatId: targetChat.chatId, userId: currentUser.id })
    const [loadable, setLoadable] = useState<MessageDTO[]>([])
    const onSended = (message: MessageDTO) => {
        const index = loadable.findIndex(x => x.id === message.id)
        loadable.splice(index, 1)
        setLoadable(loadable)
    }
    useEffect(() => {
        scrollBottom(".chat-body")
    })

    if (isLoading) return <Loading />

    return (
        <>
            <div className="chat-body chat-scrollbar">
                <div className="chat-body-scrollable">
                    <div className="flex flex-col items-start p-2 justify-end">
                        <div className="chat-message-manager">
                            {data?.messages.map((x, i) => {
                                return createMessages(x, currentUser, targetChat.user)
                            })}
                            {loadable.map(x => (
                                <LoadableMessage
                                    key={x.id}
                                    message={x}
                                    currentUser={currentUser}
                                    targetUser={targetChat.user}
                                    onSended={onSended}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ChatFooter
                onMessageSubmit={val =>
                    setLoadable(
                        loadable.concat({
                            chatId: targetChat.chatId,
                            content: val,
                            userIdFrom: currentUser.id,
                            userIdTo: targetChat.user.id,
                            created: new Date(),
                            id: v4()
                        })
                    )
                }
            />
        </>
    )
}

const LoadableMessage = (props: {
    message: MessageDTO
    currentUser: UserDTO
    targetUser: UserDTO
    onSended: (message: MessageDTO) => void
}) => {
    const [sendMessage, state] = useSendMessageMutation()
    const { currentUser, message, targetUser, onSended } = props

    useEffect(() => {
        sendMessage(message)
    }, [])

    if (state.isError) return <div>{"error"}</div>
    if (state.isLoading)
        return (
            <>
                {createMessages(message, currentUser, targetUser)}
                <Loading />
            </>
        )
    if (state.isSuccess) onSended(message)
    return <></>
}

export default MessageManager
