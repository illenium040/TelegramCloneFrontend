import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { Component } from 'react'
import Chat from './chat';
import SidebarChatList from './sidebar-chat-list';
import { UsersChat, User } from '../models/chat';

export default class ChatFacade extends Component<{}, { selectedUser?: UsersChat }> {

    private currentUser: User;
    private _connection?: HubConnection;
    constructor() {
        super({});
        this.state = { selectedUser: undefined };
        if (window.location.href === "http://localhost:3000/") {
            this.currentUser = this.createUser1();
        }
        else {
            this.currentUser = this.createUser2();
        }
    }
    async componentDidMount() {
        if (!this._connection) {
            this._connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7014/hubs/notifications")
                .withAutomaticReconnect()
                .build();
            await this._connection.start()
                .then(() => console.log('Connection started!'))
                .then(() => {
                    this._connection?.invoke('getconnectionid')
                        .then((data) => {
                            console.log(data);
                        });
                })
                .catch(err => console.log('Error while establishing connection :('));
            this._connection.on('ReceiveMessage', (receivedMessage: string) => {
                this.currentUser.chats?.at(0)?.myMessages?.push({
                    content: receivedMessage,
                    date: new Date(),
                    isRead: true
                })
            });
        }
    }

    private createUser1(): User {
        return {
            name: "Давыда",
            avatar: process.env.PUBLIC_URL + "images/davida.jpg",
            chats: [{
                user: {
                    name: "Гигачад",
                    avatar: process.env.PUBLIC_URL + "images/davida.jpg",
                },
                messages: [
                    {
                        content: "Здарова чмо)0",
                        date: new Date(),
                        isRead: true
                    }
                ],
                myMessages: [
                    {
                        content: "Da",
                        date: new Date(),
                        isRead: true
                    }
                ]
            }]
        } as User;
    }
    private createUser2(): User {
        return {
            name: "Гигачад",
            avatar: process.env.PUBLIC_URL + "images/davida.jpg",
            chats: [{
                user: {
                    name: "Давыда",
                    avatar: process.env.PUBLIC_URL + "images/davida.jpg",
                },
                messages: [
                    {
                        content: "Da",
                        date: new Date(),
                        isRead: true
                    }
                ],
                myMessages: [
                    {
                        content: "Здарова чмо)0",
                        date: new Date(),
                        isRead: true
                    }
                ]
            }]
        } as User;
    }

    async sendMessage(msg: string) {
        await this._connection?.send("SendMessage", msg);
    }


    private async onUserSelected(u: UsersChat) {
        console.log(u);
        this.setState({ selectedUser: u });
    }

    render() {
        return (
            <React.Fragment>
                <SidebarChatList chats={this.currentUser.chats} onUserSelected={this.onUserSelected.bind(this)} />
                {this.state.selectedUser !== undefined ?
                    <Chat userFrom={this.currentUser}
                        userTo={this.state.selectedUser}
                        onMessageSend={this.sendMessage.bind(this)} />
                    : <></>}
            </React.Fragment>
        )
    }
}
