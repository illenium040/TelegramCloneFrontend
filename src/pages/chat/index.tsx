import { useState } from 'react'
import { UserDTO } from '../../common/models/user-models'
import { ChatListUnit } from './models/chat'
import { useInjection } from '../../common/hooks/useInjection'
import ChatWithUser from './components/chat-with-user'
import SidebarChatList from '../sidebar-chat-list'

type ChatContainerState = {
    selectedChat?: ChatListUnit
}

type ChatContainerProps = {
    user: UserDTO
}

const ChatContainer = (props: ChatContainerProps) => {
    const { user } = props
    const [state, setState] = useState<ChatContainerState | null>(null)
    const { signalRService } = useInjection()
    const onChatSelected = (u: ChatListUnit) => {
        setState({ selectedChat: u })
    }

    return (
        <>
            <SidebarChatList user={user} onChatSelected={onChatSelected.bind(this)} />
            {state?.selectedChat && <ChatWithUser currentUser={props.user} targetChat={state!.selectedChat} />}
        </>
    )
}

export default ChatContainer
