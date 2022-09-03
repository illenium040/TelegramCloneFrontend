import { useEffect, useState } from "react";
import { useInjection } from "../../../extensions/di-container";
import { ChatDTO, ChatListUnit } from "../../../models/chat-models";
import { MessageDTO, MessageToServer } from "../../../models/message-models";
import { UserDTO } from "../../../models/user-models";
import { ChatFooter } from "../chat-footer";
import { Message } from "./message";
import { MyMessage } from "./my-message";
import { v4 as uuidv4 } from 'uuid';
import { MessageFromClient } from "./message-send";
import { scrollBottom } from "../../../extensions/global-extensions";
import { MessageObserver } from '../../../extensions/observers/message-observer';
import { ChatService } from '../../../services/chat-service';

type MessageManagerProps = {
    chat: ChatDTO;
    currentUser: UserDTO;
    targetChat: ChatListUnit;
}
let ms: MessageSender, mr: MessageReceiver;
export const MessageManager = (props: MessageManagerProps) => {
    const { chatService } = useInjection();
    if (!ms) ms = new MessageSender(chatService);
    if (!mr) mr = new MessageReceiver(chatService);
    const { chat, currentUser, targetChat } = props;
    const [sendedMessages, setMessages] = useState(new Map<string, MessageToServer>());
    const [receivedMessages, setReceivedMessages] = useState<MessageDTO[]>([]);
    const [myMessages, setMyMessages] = useState<MessageDTO[]>([]);

    ms.setCallback(sendedCallback);
    mr.setCallback(receiveCallback);

    useEffect(() => {
        scrollBottom('.chat-body');
    })

    function receiveCallback(data: MessageDTO) {
        if (data.userIdFrom == targetChat.user.id) {
            setReceivedMessages(receivedMessages.concat(data));
        }
    }
    function sendedCallback(data: MessageDTO) {
        setMyMessages(myMessages.concat(data));
    }
    const messageSened = (msgKey: string) => {
        sendedMessages.delete(msgKey);
        setMessages(new Map(sendedMessages));
    }
    const messageSubmeted = (value: string) => {
        setMessages(new Map(sendedMessages.set(uuidv4(), {
            chatId: chat.id,
            content: value,
            userIdFrom: currentUser.id,
            userIdTo: targetChat.user.id
        })));
    }
    function getTime(date?: Date) {
        const d = new Date(date!);
        try {
            return d != null ? d.getTime() : 0;
        }
        catch (error) {
            console.log(error);
            return 0;
        }
    }
    return (
        <>
            <div className='chat-body chat-scrollbar'>
                <div className='chat-body-scrollable'>
                    <div className='flex flex-col items-start p-2 justify-end'>
                        <div className="chat-message-manager">
                            {chat.messages?.map((x, i) => {
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
                            {receivedMessages.concat(myMessages)
                                .sort((a, b) => getTime(a.created) - getTime(b.created))
                                .map(x => {
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
                            {Array.from(sendedMessages).map(([key, value]) => {
                                return <MessageFromClient
                                    msgKey={key}
                                    message={value}
                                    user={currentUser}
                                    onSended={messageSened}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ChatFooter onMessageSubmit={messageSubmeted} />
        </>

    )
}

export class MessageReceiver {

    private _observer = new MessageObserver(this.onReceive.bind(this));
    private _chatService;
    private _receivedCallback: ((data: MessageDTO) => void) | undefined;
    constructor(chatService: ChatService) {
        this._chatService = chatService;
        this._chatService.subscribeOnReceive();
    }
    onReceive(data: MessageDTO) {
        this._chatService.OnReceive.removeObserver(this._observer);
        if (this._receivedCallback)
            this._receivedCallback(data);
    }

    setCallback(callback: (data: MessageDTO) => void) {
        this._chatService.OnReceive.removeObserver(this._observer);
        this._chatService.OnReceive.addObserver(this._observer);
        this._receivedCallback = callback;
    }
}

export class MessageSender {
    private _observer = new MessageObserver(this.onSended.bind(this));
    private _chatService;
    private _sendCallback: ((data: MessageDTO) => void) | undefined;
    constructor(chatService: ChatService,) {
        this._chatService = chatService;
        this._chatService.subscribeOnSended();
    }
    onSended(data: MessageDTO) {
        this._chatService.OnSended.removeObserver(this._observer);
        if (this._sendCallback)
            this._sendCallback(data);
    }

    setCallback(sended: (data: MessageDTO) => void) {
        this._chatService.OnSended.removeObserver(this._observer);
        this._chatService.OnSended.addObserver(this._observer);
        this._sendCallback = sended;

    }
}