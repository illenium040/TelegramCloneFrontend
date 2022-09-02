import React, { useEffect, useState } from 'react'
import { IObserver } from '../../extensions/observer-pattern';
import { MessageDTO } from '../../models/message-models';
import { ChatDTO } from '../../models/chat-models';
import { UserDTO } from '../../models/user-models';
import { useInjection } from '../../extensions/di-container';
import { ChatHeader } from './chat-header';
import { ChatFooter } from './chat-footer';
import { MyMessage } from './messages/my-message';
import { Message } from './messages/message';

type ChatProps = {
    chat: ChatDTO;
    currentUser: UserDTO;
    targetUser: UserDTO;
}

type ChatState = {
    messages?: MessageDTO[];
}

class ChatObserver implements IObserver<MessageDTO>{
    private _update;
    constructor(update: (data: MessageDTO) => void) {
        this._update = update;
    }
    public update(data: MessageDTO) {
        this._update(data);
    }
}

export const ChatComponent = (props: ChatProps) => {
    const { chat, currentUser, targetUser } = props;
    const [state, setState] = useState<ChatState>({ messages: chat.messages });
    const { chatService } = useInjection();

    const onReceive = (data: MessageDTO) => {
        state.messages?.push(data);
        setState({ messages: state?.messages });
        console.log(`Receive new message from ${data.userIdFrom}`);
    }

    const onSended = (data: MessageDTO) => {
        state.messages?.push(data);
        setState({ messages: state.messages });
        console.log(`Receive new message from ${data.userIdFrom}`);
    }

    //can occur bug with multiple msg
    useEffect(() => {
        chatService.OnReceive.addObserver(new ChatObserver(onReceive.bind(this)))
        chatService.OnSended.addObserver(new ChatObserver(onSended.bind(this)));
        chatService.subscribeOnReceive();
        chatService.subscribeOnSended();
    }, []);

    const messageSubmeted = (value: string) => {
        chatService.sendMessageDTO({
            chatId: chat.id,
            content: value,
            userIdFrom: currentUser.id,
            userIdTo: targetUser.id
        });
    }

    return (
        <div className='chat'>
            <ChatHeader userName={targetUser.name} />
            <div className='chat-body chat-scrollbar'>
                <div className='chat-body-scrollable'>
                    <div className='flex flex-col items-start p-2 justify-end'>
                        {state.messages?.map((x, i) => {
                            return x.userIdFrom === currentUser.id ?
                                <MyMessage avatar={currentUser.avatar}
                                    content={x.content}
                                    id={x.id}
                                    time={x.created} />
                                :
                                <Message avatar={targetUser.avatar}
                                    content={x.content}
                                    id={x.id}
                                    time={x.created} />

                        })}
                    </div>
                </div>
            </div>
            <ChatFooter onMessageSubmit={messageSubmeted} />
        </div >
    )

}
