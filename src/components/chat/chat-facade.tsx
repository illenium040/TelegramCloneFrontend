import { useCallback, useEffect, useState } from 'react'
import { UserDTO } from '../../models/user-models';
import { ChatDTO, ChatListUnit } from '../../models/chat-models';
import { useInjection } from '../../extensions/di-container';
import { SidebarChatList } from '../sidebar-chat-list';
import { ChatComponent } from './chat-component';

type ChatFacadeState = {
    selectedChat?: ChatListUnit
    chatMessages?: ChatDTO;
}

type ChatFacadeProps = {
    user: UserDTO;
}

export const ChatFacade = (props: ChatFacadeProps) => {
    const { user } = props;
    const [state, setState] = useState<ChatFacadeState | null>(null)
    const { chatService } = useInjection();

    const onChatSelected = useCallback((u: ChatListUnit) => {
        console.log(u);
        chatService.getChatMessages(u.chatId)
            .then(x => setState({ selectedChat: u, chatMessages: x }))
    }, [state]);

    return (
        <>
            <SidebarChatList
                user={user}
                onChatSelected={onChatSelected.bind(this)} />
            {state &&
                <ChatComponent
                    currentUser={props.user}
                    targetUser={state!.selectedChat!.user}
                    chat={state!.chatMessages!} />
            }
        </>
    )

}
