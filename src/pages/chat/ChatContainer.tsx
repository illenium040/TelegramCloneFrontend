import ChatWithUser from "./components/chat-with-user"
import { useConnectQuery } from "api/signalR"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import SidebarChatList from "./components/sidebar-chat-list"
import { Loader } from "pages/Loaders"
import { ChatListContextMenu } from "pages/ContextMenu"
import { ChatListContext } from "pages/ContextMenu/hooks/useContextMenu"
import { ChatViewType } from "./components/sidebar-chat-list/components/ChatUser/types"
import { useContextMenuActions } from "./components/sidebar-chat-list/hooks/useContextMenuActions"
import { useChatList } from "./components/sidebar-chat-list/hooks/useChatList"
import { useChatListCallbacks } from "./components/sidebar-chat-list/hooks/useChatListCallbacks"

const ChatContainer = () => {
    const user = useAuthContext()
    const { isLoading } = useConnectQuery(user.id)
    const { addToFolder, archive, block, clearStory, markAsUnread, remove, turnOnNotifications, unpin } =
        useContextMenuActions()
    const { isViewLoading, chatViews } = useChatList()
    const { onChatDeleted, onChatSelected, selectedChat } = useChatListCallbacks(user.id)

    if (isLoading || isViewLoading) return <Loader loaderWidth={64} />
    return (
        <>
            {chatViews && <SidebarChatList views={chatViews} onChatSelected={onChatSelected} />}
            {selectedChat && <ChatWithUser targetChat={selectedChat} />}
            <ChatListContext.Provider
                value={{ data: chatViews, elementClassName: ChatViewType.My, height: 300, width: 270 }}>
                <ChatListContextMenu
                    onArchive={archive}
                    onAddToFolder={addToFolder}
                    onBlock={block}
                    onClearStory={clearStory}
                    onMarkAsUnread={markAsUnread}
                    onTurnOnNotifications={turnOnNotifications}
                    onUnpin={unpin}
                    onDelete={view => remove(view).then(x => onChatDeleted(view))}
                />
            </ChatListContext.Provider>
        </>
    )
}

export default ChatContainer
