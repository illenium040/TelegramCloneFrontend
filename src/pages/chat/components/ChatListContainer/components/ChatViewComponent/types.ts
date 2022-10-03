import { ChatView } from "pages/chat/types"

export type ChatViewProps = {
    unit: ChatView
    chatType: ChatViewType
    handleClick: (view: ChatView) => void
    handleDelete?: (element: HTMLElement) => void
}

export enum ChatViewType {
    OnSearch = "SEARCH",
    My = "MY_CHAT"
}
