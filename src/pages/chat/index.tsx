import { useState } from 'react'
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
    const onChatSelected = (u: ChatListUnit) => {
        setSelectedChat(u)
    }

    return (
        <>
            <SidebarChatList user={user} onChatSelected={onChatSelected.bind(this)} />
            {selectedChat && <ChatWithUser currentUser={props.user} targetChat={selectedChat} />}
        </>
    )
}

export default ChatContainer
