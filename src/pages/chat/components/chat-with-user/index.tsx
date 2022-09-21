import "./chat.css"
import ChatHeader from "../chat-with-user-header"
import { Loading } from "pages/Loading"
import ChatFooter from "../chat-with-user-footer"
import Message from "../chat-message"
import { scrollBottom } from "common/extensions/global-extensions"
import { useMessaging } from "./hooks/useMessaging"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatView } from "pages/chat/types"
import { useEffect } from "react"

type ChatProps = {
    targetChat: ChatView
}

const ChatWithUser = (props: ChatProps) => {
    const currentUser = useAuthContext()
    const { targetChat } = props
    const { loadableMessages, messageQuery, submitMessage } = useMessaging(currentUser, targetChat)
    const messages = messageQuery.data?.data?.messages

    useEffect(() => {
        scrollBottom(".chat-body")
    })

    if (messageQuery.isFetching) return <Loading />

    return (
        <div className="chat">
            <ChatHeader userName={targetChat.user.name} />
            <div className="chat-body chat-scrollbar">
                <div className="chat-body-scrollable">
                    <div className="flex flex-col items-start p-2 justify-end w-full">
                        {messages?.concat(loadableMessages).map((x, i) => (
                            <Message key={x.id} message={x} userTo={targetChat.user} userFrom={currentUser} />
                        ))}
                    </div>
                </div>
            </div>
            <ChatFooter onMessageSubmit={submitMessage} />
        </div>
    )
}

export default ChatWithUser
