import React, { Component } from 'react'
import { FiPaperclip } from "@react-icons/all-files/fi/FiPaperclip";
import { VscSmiley } from "@react-icons/all-files/vsc/VscSmiley";

import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BsReverseLayoutSidebarReverse } from "@react-icons/all-files/bs/BsReverseLayoutSidebarReverse";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { IObserver } from '../extensions/observer-pattern';
import { ChatService } from '../services/chat-service';
import { MessageDTO } from '../models/message-models';
import { ChatDTO } from '../models/chat-models';
import { UserDTO } from '../models/user-models';

type ChatProps = {
    chat: ChatDTO;
    currentUser: UserDTO;
    targetUser: UserDTO;
    chatService: ChatService;
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

export default class ChatComponent extends Component<ChatProps, { messages?: MessageDTO[] }>{
    private _inpValue: string;
    private _onReceive: ChatObserver;
    private _onSended: ChatObserver;

    constructor(props: ChatProps) {
        super(props);
        this._onReceive = new ChatObserver(this.onReceive.bind(this));
        this._onSended = new ChatObserver(this.onSended.bind(this));
        this.props.chatService.OnReceive.addObserver(this._onReceive);
        this.props.chatService.OnSended.addObserver(this._onSended);
        this.state = { messages: this.props.chat.messages };
        this._inpValue = "";
    }

    private onEnterKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).value = "";
            this.props.chatService.sendMessageDTO({
                chatId: this.props.chat.id,
                content: this._inpValue,
                userIdFrom: this.props.currentUser.id,
                userIdTo: this.props.targetUser.id
            });
        }
    }

    private onReceive(data: MessageDTO) {
        this.state.messages?.push(data);
        this.setState({ messages: this.state.messages });
        console.log(`Receive new message from ${data.userIdFrom}`);
    }

    private onSended(data: MessageDTO) {
        this.state.messages?.push(data);
        this.setState({ messages: this.state.messages });
        console.log(`Receive new message from ${data.userIdFrom}`);
    }

    render() {
        return (
            <div className='chat'>
                <div className='chat-header border-gray text-header-bold'>
                    <div className='flex flex-col w-full'>
                        <span>{this.props.targetUser.name}</span>
                        <span className='text-default-gray'>{"Был(а) недавно"}</span>
                    </div>
                    <div className='self-end flex flex-row items-center'>
                        <BsSearch className='chat-header-icon ' />
                        <BsReverseLayoutSidebarReverse className='chat-header-icon' />
                        <BsThreeDotsVertical className='chat-header-icon m-0' />
                    </div>
                </div>
                <div className='chat-body'>
                    {this.state.messages?.map((x, i) => {
                        return x.userIdFrom === this.props.currentUser.id ?
                            <div key={x.id} className='chat-message my-chat-message'>
                                <span className='chat-message-avatar'>
                                    <img src={this.props.currentUser.avatar} alt="" />
                                </span>
                                <div className='chat-message-text-container'>
                                    <p className='text-black'>{x.content}</p>
                                    <span className='text-default-gray ml-2 mt-2 self-end'>20:11</span>
                                </div>
                            </div>
                            :
                            <div key={x.id} className='chat-message'>
                                <span className='chat-message-avatar'>
                                    <img src={this.props.targetUser.avatar} alt="" />
                                </span>
                                <div className='chat-message-text-container'>
                                    <p className='text-black'>{x.content}</p>
                                    <span className='text-default-gray ml-2 mt-2 self-end'>20:10</span>
                                </div>
                            </div>
                    })}
                </div>
                <div className='chat-footer border-gray'>
                    <FiPaperclip className='chat-footer-icon' />
                    <input
                        onKeyDown={this.onEnterKeyDown.bind(this)}
                        onChange={(e) => this._inpValue = e.target.value}
                        className='chat-input' placeholder='Написать сообщение...' type="text" />
                    <VscSmiley className='chat-footer-icon' />
                </div>
            </div >
        )
    }
}
