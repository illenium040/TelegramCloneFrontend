import { MessageToServer } from './../../models/message-models';
import { ChatDTO } from './../../models/chat-models';
import { MessageDTO } from '../../models/message-models';
import { IType, ITypeWithPayload } from './base-types';

export enum GetMessages {
    FETCH = "GET_CHAT_MESSAGED",
    ERROR = "GOT_CHAT_MESSAGES_ERROR",
    SUCCESS = "GOT_CHAT_MESSAGES"
}

export enum SendMessage {
    SEND = "SEND_CHAT_MESSAGE",
    SENDING = "SENDING_CHAT_MESSAGE",
    SENDED = "CHAT_MESSAGE_SENDED",
    ERROR = "CHAT_MESSAGE_ERROR"
}

export type SendErrorMessage = {
    error: string;
    senedeMessage: MessageToServer;
}

export type SendChatMessages =
    ITypeWithPayload<MessageToServer, SendMessage.SEND> |
    ITypeWithPayload<MessageToServer, SendMessage.SENDING> |
    IType<SendMessage.SENDED> |
    ITypeWithPayload<SendErrorMessage, SendMessage.ERROR>;

export type GetChatMessages =
    IType<GetMessages.FETCH> |
    ITypeWithPayload<ChatDTO, GetMessages.SUCCESS> |
    ITypeWithPayload<string, GetMessages.ERROR>