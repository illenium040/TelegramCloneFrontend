import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { Component } from 'react'
import ChatComponent from './chat';
import SidebarChatList from './sidebar-chat-list';
import { UserChatDTO, UserChatList, UserDTO } from '../models/user';
import { UserService } from "../services/user-service";
import { ChatModel } from "../models/chat";

export default class ChatFacade extends Component<{ user: UserDTO }, { selectedChat?: ChatModel }> {

    private _connection?: HubConnection;
    private _userService: UserService;

    constructor(user: UserChatDTO) {
        super({ user });
        this.state = { selectedChat: undefined };
        this._userService = new UserService();
        //if (window.location.href === "http://localhost:3000/")
    }

    private async onChatSelected(u: ChatModel) {
        console.log(u);
        this.setState({ selectedChat: u });
    }

    render() {
        return (
            <React.Fragment>
                <SidebarChatList
                    userChatList={this._userService.getUserChatList(this.props.user.id)}
                    onChatSelected={this.onChatSelected.bind(this)} />
                {this.state.selectedChat !== undefined ?
                    <ChatComponent chat={this.state.selectedChat} />
                    : <></>}
            </React.Fragment>
        )
    }
}
