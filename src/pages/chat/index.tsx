import { createRef, useRef, useState } from 'react'
import { UserDTO } from 'common/models/user-models'
import { ChatListUnit } from './models/chat'
import ChatWithUser from './components/chat-with-user'
import SidebarChatList from '../sidebar-chat-list'

type ChatContainerProps = {
    user: UserDTO
}

const ChatContainer = (props: ChatContainerProps) => {
    const { user } = props
    const [selectedChat, setSelectedChat] = useState<ChatListUnit | null>(null)
    const chats = useRef(new Map<string, JSX.Element>())
    const onChatSelected = (u: ChatListUnit) => {
        if (!chats.current.has(u.chatId))
            chats.current.set(u.chatId, ChatWithUser({ currentUser: props.user, targetChat: u }))
        setSelectedChat(u)
    }

    return (
        <>
            <SidebarChatList user={user} onChatSelected={onChatSelected.bind(this)} />
            {selectedChat && chats.current.get(selectedChat.chatId)}
        </>
    )
}

export default ChatContainer
