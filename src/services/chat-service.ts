import { MessageToServer } from './../models/message-models';
import { serverHost, tryAxiosRequest } from './../extensions/axios-extensions';
import { ObserverEvent } from "../extensions/observer-pattern";
import { ChatDTO, ChatListUnit } from "../models/chat-models";
import { MessageDTO } from "../models/message-models";
import { SignalRService } from "./signalR-services";
import axios from 'axios';

export class ChatService {
    public OnReceive: ObserverEvent<MessageDTO>;
    public OnSended: ObserverEvent<MessageDTO>;
    constructor() {
        this.OnReceive = new ObserverEvent();
        this.OnSended = new ObserverEvent();
        SignalRService.getInstanceOf().OnMessageReceive((messageDTO: MessageDTO) => {
            console.log(messageDTO);
            this.OnReceive.notifyObservers(messageDTO);
        });
        SignalRService.getInstanceOf().OnMessageSended((messageDTO: MessageDTO) => {
            console.log(messageDTO);
            this.OnSended.notifyObservers(messageDTO);
        });
    }

    public async sendMessageDTO(msg: MessageToServer) {
        SignalRService.getInstanceOf().sendMessage(msg);
    }

    public async getChatList(userId: string) {
        return (await axios.get<ChatListUnit[]>(serverHost + `/api/db/chatlist/${userId}`))?.data;
    }

    public async getChatMessages(chatId: string) {
        return (await axios.get<ChatDTO>(serverHost + `/api/db/chat/${chatId}`))?.data;
    }
}