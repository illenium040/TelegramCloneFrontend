import { ChatView } from "pages/chat/types"

export type SidebarChatListProps = {
    onChatSelected: (chat: ChatView) => void
    onChatDeleted: (chat: ChatView) => void
}
