import { Chat } from "./components/main-chat"
import { useConnectQuery } from "api/signalR"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { SidebarChatList } from "./components/sidebar-chat-list"
import { Loader } from "pages/Loaders"
import { ChatListContextMenu } from "pages/ContextMenu"
import { ChatListContext } from "pages/ContextMenu/hooks/useContextMenu"
import { ChatViewType } from "./components/sidebar-chat-list/components/ChatViewComponent/types"
import { useContextMenuActions } from "./components/sidebar-chat-list/hooks/useContextMenuActions"
import { useChatList } from "./components/sidebar-chat-list/hooks/useChatList"
import { useChatListCallbacks } from "./components/sidebar-chat-list/hooks/useChatListCallbacks"

export const ChatContainer = () => {
    const user = useAuthContext()
    const { isLoading } = useConnectQuery(user.id)
    const { addToFolder, archive, block, clearStory, markAsUnread, remove, notification, unpin } =
        useContextMenuActions()
    const { isViewLoading, chatViews } = useChatList()
    const { onChatDeleted, onChatSelected, onChatArchived, selectedChat } = useChatListCallbacks(user.id)

    if (isLoading || isViewLoading) return <Loader loaderWidth={64} />
    return (
        <>
            {chatViews && <SidebarChatList views={chatViews} onChatSelected={onChatSelected} />}
            {selectedChat && <Chat view={selectedChat} />}
            <ChatListContext.Provider value={{ data: chatViews, elementClassName: ChatViewType.My }}>
                <ChatListContextMenu
                    onArchive={view => archive(view).then(x => onChatArchived(view))}
                    onAddToFolder={addToFolder}
                    onBlock={block}
                    onClearStory={clearStory}
                    onMarkAsUnread={markAsUnread}
                    onTurnOnNotifications={notification}
                    onUnpin={unpin}
                    onDelete={view => remove(view).then(x => onChatDeleted(view))}
                />
            </ChatListContext.Provider>
        </>
    )
}
