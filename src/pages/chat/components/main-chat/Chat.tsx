import "./chat.css"
import { Loader } from "pages/Loaders"
import { ChatFooter } from "../chat-footer"
import { Message } from "../chat-message"
import { scrollBottom } from "common/extensions/global-extensions"
import { useMessaging } from "./hooks/useMessaging"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatView } from "pages/chat/types"
import { useEffect } from "react"
import { MessageContext } from "pages/ContextMenu/hooks/useContextMenu"
import { MessageContextMenu } from "pages/ContextMenu/MessageContextMenu"
import { ChatHeader } from "../chat-header"

type ChatProps = {
    view: ChatView
}

export const Chat = (props: ChatProps) => {
    const currentUser = useAuthContext()
    const { view } = props
    const { messageQuery, submitMessage } = useMessaging(currentUser, view)
    const messages = messageQuery.data?.data?.messages

    useEffect(() => {
        scrollBottom(".chat-body")
    })

    if (messageQuery.isFetching) return <Loader loaderWidth={64} />
    return (
        <div className="chat">
            <ChatHeader userName={view.user.name} />
            <div className="chat-body chat-scrollbar">
                <div className="chat-body-scrollable">
                    <div className="flex flex-col items-start p-2 justify-end w-full">
                        {messages?.map((x, i) => (
                            <Message key={x.id} message={x} userTo={view.user} userFrom={currentUser} />
                        ))}
                    </div>
                </div>
            </div>
            <ChatFooter onMessageSubmit={submitMessage} />
            <MessageContext.Provider
                value={{
                    data: messages,
                    elementClassName: "chat-message"
                }}>
                <MessageContextMenu />
            </MessageContext.Provider>
        </div>
    )
}
