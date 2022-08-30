import React, { Component } from 'react'
import { FiPaperclip } from "@react-icons/all-files/fi/FiPaperclip";
import { VscSmiley } from "@react-icons/all-files/vsc/VscSmiley";
import { ChatBuilder, Chat, ChatModel, Message } from '../models/chat';

import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BsReverseLayoutSidebarReverse } from "@react-icons/all-files/bs/BsReverseLayoutSidebarReverse";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { IObserver } from '../extensions/observer-pattern';

type ChatProps = {
    chat: ChatModel;
}

export default class ChatComponent extends Component<ChatProps, { messages?: Message[] }> implements IObserver {
    private _inpValue: string;
    private _chat?: Chat;

    constructor(props: ChatProps) {
        super(props);
        this.state = {
            messages: Array.prototype.concat(this.props.chat.myDTO.messages, this.props.chat.userDTO.messages)
        };
        this._inpValue = "";
    }

    private onEnterKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            let msg = {
                userId: this.props.chat.myDTO.id,
                content: this._inpValue,
                date: new Date(),
                isRead: false
            };
            this._chat?.sendMessage(msg).then(x => {
                this.state.messages?.push(msg)
                this.setState({ messages: this.state.messages })
            });
        }
    }

    async componentDidMount() {
        if (this._chat) return;
        this._chat = await (new ChatBuilder()
            .addModel(this.props.chat)
            .addSignalRConnection()
            .build())
        this._chat.OnReceive.addObserver(this);
    }

    public update() {
        console.log("Chat updated!");
    }

    render() {
        return (
            <div className='chat'>
                <div className='chat-header border-gray text-header-bold'>
                    <div className='flex flex-col w-full'>
                        <span>{this.props.chat.userDTO.name}</span>
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
                        return x.userId === this.props.chat.myDTO.id ?
                            <div className='chat-message my-chat-message'>
                                <span className='chat-message-avatar'>
                                    <img src={this.props.chat.myDTO.avatar} alt="" />
                                </span>
                                <div className='chat-message-text-container'>
                                    <p className='text-black'>{x.content}</p>
                                    <span className='text-default-gray ml-2 mt-2 self-end'>20:11</span>
                                </div>
                            </div>
                            :
                            <div className='chat-message'>
                                <span className='chat-message-avatar'>
                                    <img src={this.props.chat.userDTO.avatar} alt="" />
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
