
export interface IMessage {
    content: string;
    userIdFrom: string;
}

export interface MessageToServer extends IMessage {
    userIdTo: string;
    chatId: string;
    content: string;
}

export interface MessageDTO extends IMessage {
    id: string;
    created: Date;
}