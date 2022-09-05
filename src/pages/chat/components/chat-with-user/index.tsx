import { useEffect } from 'react'
import ChatHeader from '../chat-with-user-header'
import MessageManager from '../chat-message-manager'
import Loading from 'pages/loading'
import { UserDTO } from 'common/models/user-models'
import { ChatListUnit } from 'pages/chat/models/chat'
import { useInjection } from 'common/hooks/useInjection'

type ChatProps = {
    currentUser: UserDTO
    targetChat: ChatListUnit
}

const ChatWithUser = (props: ChatProps) => {
    const { currentUser, targetChat } = props
    return (
        <div className="chat">
            <ChatHeader userName={targetChat.user.name} />
            <MessageManager currentUser={currentUser} targetChat={targetChat} />
        </div>
    )
}

export default ChatWithUser
