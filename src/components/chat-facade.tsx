import React, { Component } from 'react'
import ChatComponent from './chat-component';
import SidebarChatList from './sidebar-chat-list';
import { ChatService } from '../services/chat-service';
import { UserDTO } from '../models/user-models';
import { ChatDTO, ChatListUnit } from '../models/chat-models';

interface ChatFacadeState {
    selectedChat?: ChatListUnit
    chatMessages?: ChatDTO;
}

export default class ChatFacade extends Component<{ user: UserDTO }, ChatFacadeState> {

    private _chatService: ChatService;
    constructor(user: UserDTO) {
        super({ user });
        this.state = {
            selectedChat: undefined,
            chatMessages: undefined
        };
        this._chatService = new ChatService();
    }

    private onChatSelected(u: ChatListUnit) {
        console.log(u);
        this._chatService.getChatMessages(u.chatId)
            .then(x => this.setState({ selectedChat: u, chatMessages: x }))
    }

    render() {
        return (
            <React.Fragment>
                <SidebarChatList
                    chatService={this._chatService}
                    user={this.props.user}
                    onChatSelected={this.onChatSelected.bind(this)} />
                {this.state.selectedChat !== undefined &&
                    this.state.chatMessages !== undefined ?
                    <ChatComponent
                        chatService={this._chatService}
                        currentUser={this.props.user}
                        targetUser={this.state.selectedChat.user}
                        chat={this.state.chatMessages} />
                    : <></>}
            </React.Fragment>
        )
    }
}
