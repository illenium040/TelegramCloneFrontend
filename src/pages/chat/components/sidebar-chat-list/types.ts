import { ChatView } from "pages/chat/types"

export type SidebarChatListProps = {
    views: ChatView[]
    onChatSelected: (chat: ChatView) => void
}
