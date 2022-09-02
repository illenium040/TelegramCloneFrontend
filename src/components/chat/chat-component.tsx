import { useCallback, useEffect, useState } from 'react'
import { IObserver } from '../../extensions/observer-pattern';
import { MessageDTO } from '../../models/message-models';
import { ChatDTO, ChatListUnit } from '../../models/chat-models';
import { UserDTO } from '../../models/user-models';
import { useInjection } from '../../extensions/di-container';
import { ChatHeader } from './chat-header';
import { ChatFooter } from './chat-footer';
import { MyMessage } from './messages/my-message';
import { Message } from './messages/message';
import { useTypedSelector } from '../../store/store';
import { useActions } from '../../store/use-actions';
import { Loading } from '../helpers/loading';

type ChatProps = {
    currentUser: UserDTO;
    targetChat: ChatListUnit;
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


//idk but have to optimize
export const ChatComponent = (props: ChatProps) => {
    const { currentUser, targetChat } = props;
    const [messages, setMessages] = useState<MessageDTO[]>([]);
    const { chatService } = useInjection();
    const { chat, error, loading } = useTypedSelector(state => state.getChatMessagesReducer);
    const sendMessageState = useTypedSelector(state => state.sendChatMessageReducer);
    const { getChatMessages, sendChatMessage } = useActions();

    const onReceive = useCallback((data: MessageDTO) => {
        setMessages(messages.concat(data));
        console.log(`Receive new message from ${data.userIdFrom}`);
    }, [messages]);

    const onSended = useCallback((data: MessageDTO) => {
        setMessages(messages.concat(data));
        console.log(`Receive new message from ${data.userIdFrom}`);
    }, [messages]);

    //can occur bug with multiple msg
    useEffect(() => {
        getChatMessages(targetChat.chatId, chatService);
    }, []);

    useEffect(() => {
        if (chat && messages?.length === 0) {
            setMessages(chat.messages);

        }
    }, [chat]);
    useEffect(() => {
        if (messages.length > 0) {
            chatService.OnReceive.clear();
            chatService.OnSended.clear();
            chatService.OnReceive.addObserver(new ChatObserver(onReceive))
            chatService.OnSended.addObserver(new ChatObserver(onSended));
            chatService.subscribeOnReceive();
            chatService.subscribeOnSended();
        }
    }, [messages])

    const messageSubmeted = (value: string) => {
        sendChatMessage({
            chatId: chat!.id,
            content: value,
            userIdFrom: currentUser.id,
            userIdTo: targetChat.user.id
        }, chatService);
    }

    if (error) return (<div>{error}</div>)
    if (loading) return <Loading />
    return (
        <div className='chat'>
            <ChatHeader userName={targetChat.user.name} />
            <div className='chat-body chat-scrollbar'>
                <div className='chat-body-scrollable'>
                    <div className='flex flex-col items-start p-2 justify-end'>
                        {messages?.map((x, i) => {
                            return x.userIdFrom === currentUser.id ?
                                <MyMessage key={x.id} avatar={currentUser.avatar}
                                    content={x.content}
                                    id={x.id}
                                    time={x.created} />
                                :
                                <Message key={x.id} avatar={targetChat.user.avatar}
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
