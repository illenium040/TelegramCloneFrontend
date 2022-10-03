import { ChatView } from "pages/chat/types"

export type ChatListContainerProps = {
    views: ChatView[]
    onChatSelected: (chat: ChatView) => void
}
