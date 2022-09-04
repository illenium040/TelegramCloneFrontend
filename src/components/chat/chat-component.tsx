import { useEffect } from 'react'
import { ChatListUnit } from '../../models/chat-models'
import { UserDTO } from '../../models/user-models'
import { ChatHeader } from './chat-header'
import { useTypedSelector } from '../../store/store'
import { useActions } from '../../store/use-actions'
import { Loading } from '../helpers/loading'
import { MessageManager } from './messages/message-manager'
import { useInjection } from '../../hooks/useInjection'

type ChatProps = {
    currentUser: UserDTO
    targetChat: ChatListUnit
}

export const ChatComponent = (props: ChatProps) => {
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
