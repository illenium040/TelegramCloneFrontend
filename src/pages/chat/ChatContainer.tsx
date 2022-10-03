import { Chat } from "./components/MainChat"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatListContainer } from "./components/ChatListContainer"
import { Loader } from "pages/Loaders"
import { ChatListContextMenu } from "pages/ContextMenu"
import { ChatListContext } from "pages/ContextMenu/hooks/useContextMenu"
import { ChatViewType } from "./components/ChatListContainer/components/ChatViewComponent/types"
import { useContextMenuActions } from "./components/ChatListContainer/hooks/useContextMenuActions"
import { useChatList } from "./components/ChatListContainer/hooks/useChatList"
import { useChatListCallbacks } from "./components/ChatListContainer/hooks/useChatListCallbacks"
import { createContext, useContext } from "react"
import { ChatView } from "./types"

export const useChatContext = () => useContext(ChatViewCallbackContext)

type ChatViewCallbacks = {
    onChatDeleted: (view: ChatView) => void
    onChatArchived: (view: ChatView) => void
}

const ChatViewCallbackContext = createContext<ChatViewCallbacks>({
    onChatArchived: (view: ChatView) => {},
    onChatDeleted: (view: ChatView) => {}
})

export const ChatContainer = () => {
    const user = useAuthContext()
    const { isViewLoading, chatViews } = useChatList()
    const { onChatDeleted, onChatSelected, onChatArchived, selectedChat } = useChatListCallbacks(user.id)

    if (isViewLoading) return <Loader loaderWidth={64} />

    return (
        <ChatViewCallbackContext.Provider
            value={{
                onChatArchived,
                onChatDeleted
            }}>
            {chatViews && <ChatListContainer views={chatViews} onChatSelected={onChatSelected} />}
            {selectedChat && <Chat view={selectedChat} />}
        </ChatViewCallbackContext.Provider>
    )
}
