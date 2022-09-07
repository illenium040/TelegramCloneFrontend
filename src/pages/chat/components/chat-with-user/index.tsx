import ChatHeader from "../chat-with-user-header"
import { UserDTO } from "common/models/user-models"
import { ChatListUnit } from "pages/chat/models/chat"
import { useEffect } from "react"
import Loading from "pages/loading"
import ChatFooter from "../chat-with-user-footer"
import Message, { MessageState } from "../chat-message"
import { scrollBottom } from "common/extensions/global-extensions"
import { useGetChatMessagesQuery, useSendMessageMutation } from "api/signalR"
import { useTypedSelector } from "api"
import { v4 } from "uuid"

type ChatProps = {
    currentUser: UserDTO
    targetChat: ChatListUnit
}

const ChatWithUser = (props: ChatProps) => {
    const { currentUser, targetChat } = props
    const messages = useGetChatMessagesQuery({ chatId: targetChat.chatId, userId: currentUser.id })
    const [sendMessage, state] = useSendMessageMutation()
    const loadable = useTypedSelector(state => state.loadable)

    useEffect(() => {
        scrollBottom(".chat-body")
    })

    if (messages.isLoading) return <Loading />

    const onSubmitted = (val: string) => {
        sendMessage({
            chatId: targetChat.chatId,
            content: val,
            created: new Date(),
            userIdFrom: currentUser.id,
            userIdTo: targetChat.user.id,
            id: v4()
        })
    }

    return (
        <div className="chat">
            <ChatHeader userName={targetChat.user.name} />
            <div className="chat-body chat-scrollbar">
                <div className="chat-body-scrollable">
                    <div className="flex flex-col items-start p-2 justify-end">
                        <div className="chat-message-manager">
                            {messages.data?.messages.map((x, i) => (
                                <Message
                                    key={x.id}
                                    message={x}
                                    state={MessageState.SENDED_TO_USER}
                                    userTo={currentUser}
                                    userFrom={currentUser}
                                />
                            ))}
                            {loadable?.map(x => {
                                return x.message.chatId === targetChat.chatId ? (
                                    <Message
                                        key={x.message.id}
                                        message={x.message}
                                        userFrom={currentUser}
                                        userTo={targetChat.user}
                                        state={x.state}
                                    />
                                ) : (
                                    <></>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ChatFooter onMessageSubmit={onSubmitted} />
        </div>
    )
}

export default ChatWithUser
