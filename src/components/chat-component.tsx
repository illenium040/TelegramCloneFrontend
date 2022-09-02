import React, { useEffect, useState } from 'react'
import { FiPaperclip } from "@react-icons/all-files/fi/FiPaperclip";
import { VscSmiley } from "@react-icons/all-files/vsc/VscSmiley";

import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BsReverseLayoutSidebarReverse } from "@react-icons/all-files/bs/BsReverseLayoutSidebarReverse";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { IObserver } from '../extensions/observer-pattern';
import { MessageDTO } from '../models/message-models';
import { ChatDTO } from '../models/chat-models';
import { UserDTO } from '../models/user-models';
import { useInjection } from '../extensions/di-container';

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
    let messageInputValue: string = "";

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

    const onEnterKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).value = "";
            chatService.sendMessageDTO({
                chatId: chat.id,
                content: messageInputValue,
                userIdFrom: currentUser.id,
                userIdTo: targetUser.id
            });
        }
    }

    return (
        <div className='chat'>
            <div className='chat-header border-gray text-header-bold'>
                <div className='flex flex-col w-full'>
                    <span>{targetUser.name}</span>
                    <span className='text-default-gray'>{"Был(а) недавно"}</span>
                </div>
                <div className='self-end flex flex-row items-center'>
                    <BsSearch className='chat-header-icon ' />
                    <BsReverseLayoutSidebarReverse className='chat-header-icon' />
                    <BsThreeDotsVertical className='chat-header-icon m-0' />
                </div>
            </div>
            <div className='chat-body chat-scrollbar'>
                <div className='chat-body-scrollable'>
                    <div className='flex flex-col items-start p-2 justify-end'>
                        {state.messages?.map((x, i) => {
                            return x.userIdFrom === currentUser.id ?
                                <div key={x.id} className='chat-message my-chat-message'>
                                    <span className='chat-message-avatar'>
                                        <img src={currentUser.avatar} alt="" />
                                    </span>
                                    <div className='chat-message-text-container'>
                                        <p className='text-black'>{x.content}</p>
                                        <span className='text-default-gray ml-2 mt-2 self-end'>20:11</span>
                                    </div>
                                </div>
                                :
                                <div key={x.id} className='chat-message'>
                                    <span className='chat-message-avatar'>
                                        <img src={targetUser.avatar} alt="" />
                                    </span>
                                    <div className='chat-message-text-container'>
                                        <p className='text-black'>{x.content}</p>
                                        <span className='text-default-gray ml-2 mt-2 self-end'>20:10</span>
                                    </div>
                                </div>
                        })}
                    </div>
                </div>
            </div>
            <div className='chat-footer border-gray'>
                <FiPaperclip className='chat-footer-icon' />
                <input
                    onKeyDown={onEnterKeyDown.bind(this)}
                    onChange={(e) => messageInputValue = e.target.value}
                    className='chat-input' placeholder='Написать сообщение...' type="text" />
                <VscSmiley className='chat-footer-icon' />
            </div>
        </div >
    )

}
