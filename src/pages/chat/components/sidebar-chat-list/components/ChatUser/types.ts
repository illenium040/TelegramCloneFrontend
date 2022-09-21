import { ChatView } from "pages/chat/types"

export type ChatUserProps = {
    unit: ChatView
    chatType: ChatViewType
    handleClick: () => void
    handleDelete?: (element: HTMLElement) => void
}

export enum ChatViewType {
    OnSearch = "SEARCH",
    My = "MY_CHAT"
}
