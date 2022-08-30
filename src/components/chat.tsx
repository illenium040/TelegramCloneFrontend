import React, { Component } from 'react'
import { FiPaperclip } from "@react-icons/all-files/fi/FiPaperclip";
import { VscSmiley } from "@react-icons/all-files/vsc/VscSmiley";
import { UsersChat, User } from '../models/chat';

import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BsReverseLayoutSidebarReverse } from "@react-icons/all-files/bs/BsReverseLayoutSidebarReverse";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";

type ChatProps = {
    userFrom: User;
    userTo: UsersChat;
    onMessageSend: (msg: string) => Promise<void>;
}


export default class Chat extends Component<ChatProps> {

    private _inpValue: string;

    constructor(props: ChatProps) {
        super(props);
        this._inpValue = "";
    }

    private onEnterKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            this.props.onMessageSend(this._inpValue);
        }
    }

    render() {
        return (
            <div className='chat'>
                <div className='chat-header border-gray text-header-bold'>
                    <div className='flex flex-col w-full'>
                        <span>{this.props.userTo.user.name}</span>
                        <span className='text-default-gray'>{"Был(а) недавно"}</span>
                    </div>
                    <div className='self-end flex flex-row items-center'>
                        <BsSearch className='chat-header-icon ' />
                        <BsReverseLayoutSidebarReverse className='chat-header-icon' />
                        <BsThreeDotsVertical className='chat-header-icon m-0' />
                    </div>
                </div>
                <div className='chat-body'>
                    {this.props.userTo.messages?.map((x, i) =>
                        <div className='chat-message'>
                            <span className='chat-message-avatar'>
                                <img src={this.props.userTo.user.avatar} alt="" />
                            </span>
                            <div className='chat-message-text-container'>
                                <p className='text-black'>{x.content}</p>
                                <span className='text-default-gray ml-2 mt-2 self-end'>20:10</span>
                            </div>
                        </div>
                    )}
                    {this.props.userTo.myMessages?.map((x, i) =>
                        <div className='chat-message my-chat-message'>
                            <span className='chat-message-avatar'>
                                <img src={this.props.userTo.user.avatar} alt="" />
                            </span>
                            <div className='chat-message-text-container'>
                                <p className='text-black'>{x.content}</p>
                                <span className='text-default-gray ml-2 mt-2 self-end'>20:11</span>
                            </div>
                        </div>
                    )}
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
