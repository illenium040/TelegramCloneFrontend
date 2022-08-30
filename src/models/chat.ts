import { SignalRService } from './../services/signalR-services';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ObserverEvent } from './../extensions/observer-pattern';
import { UserChatDTO, UserDTO } from './user';


export interface Message {
    userId: string;
    content: string;
    date: Date;
    isRead: boolean;
}

export interface ChatModel {
    chatId: string;
    myDTO: UserChatDTO;
    userDTO: UserChatDTO;
}

export class ChatBuilder {
    private _chatModel?: ChatModel;
    private _signalRService?: SignalRService;
    public addModel(chatModel: ChatModel) {
        this._chatModel = chatModel;
        return this;
    }

    public addSignalRConnection() {
        this._signalRService = new SignalRService();
        return this;
    }
    public async build() {
        if (!this._chatModel)
            throw new Error("Chat model has to be initialized");
        if (!this._signalRService)
            throw new Error("SignalRService has to be initialized");
        this._signalRService.startConnection()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        return new Chat(this._chatModel, this._signalRService);
    }

}


export class Chat {
    private _chatModel: ChatModel;
    private _signalRService: SignalRService;
    private _onReceive: ObserverEvent;
    private _onSend: ObserverEvent;

    constructor(chatModel: ChatModel, signalRService: SignalRService) {
        this._chatModel = chatModel;
        this._signalRService = signalRService;
        this._onReceive = new ObserverEvent();
        this._onSend = new ObserverEvent();
        this.onReceive();
    }

    private onReceive() {
        this._signalRService.Hub?.on('ReceiveMessage', (receivedMessage: string) => {
            console.log(receivedMessage);
            this._onReceive.notifyObservers();
        });
    }

    public async sendMessage(msg: Message) {
        this._signalRService.Hub?.send("SendMessage", this._chatModel.userDTO.id, msg.content).then(x => {
            console.log(x);
            this._onSend.notifyObservers();
        });
    }

    get OnReceive() {
        return this._onReceive;
    }

}