import { useState } from 'react'
import { UserDTO } from '../../models/user-models';
import { ChatListUnit } from '../../models/chat-models';
import { SidebarChatList } from '../sidebar-chat-list';
import { ChatComponent } from './chat-component';

type ChatFacadeState = {
    selectedChat?: ChatListUnit
}

type ChatFacadeProps = {
    user: UserDTO;
}

export const ChatFacade = (props: ChatFacadeProps) => {
    const { user } = props;
    const [state, setState] = useState<ChatFacadeState | null>(null)

    const onChatSelected = (u: ChatListUnit) => {
        setState({ selectedChat: u });
    };

    return (
        <>
            <SidebarChatList
                user={user}
                onChatSelected={onChatSelected.bind(this)} />
            {state?.selectedChat &&
                <ChatComponent
                    currentUser={props.user}
                    targetChat={state!.selectedChat}
                />
            }
        </>
    )

}
