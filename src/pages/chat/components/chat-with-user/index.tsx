import { useEffect } from 'react'
import { ChatListUnit } from '../../models/chat'
import { UserDTO } from '../../../../common/models/user-models'
import { useActions, useTypedSelector } from '../../../../common/store'
import { useInjection } from '../../../../common/hooks/useInjection'
import ChatHeader from '../chat-with-user-header'
import MessageManager from '../chat-message-manager'
import Loading from '../../../loading'

type ChatProps = {
    currentUser: UserDTO
    targetChat: ChatListUnit
}

const ChatWithUser = (props: ChatProps) => {
    const { currentUser, targetChat } = props
    const { chatService } = useInjection()
    const { chat, error, loading } = useTypedSelector(state => state.getChatMessagesReducer)
    const { getChatMessages } = useActions()

    useEffect(() => {
        getChatMessages(targetChat.chatId, chatService)
    }, [])

    useEffect(() => {
        if (loading) return
        getChatMessages(targetChat.chatId, chatService)
    }, [targetChat])

    if (error) return <div>{error}</div>
    if (loading) return <Loading />

    return (
        <div className="chat">
            <ChatHeader userName={targetChat.user.name} />
            <MessageManager chat={chat!} currentUser={currentUser} targetChat={targetChat} />
        </div>
    )
}

export default ChatWithUser
