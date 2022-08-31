
export interface MessageToServer {
    userIdTo: string;
    chatId: string;
    userIdFrom: string;
    content: string;
}

export interface MessageDTO {
    id: string;
    userIdFrom: string;
    content: string;
    created: Date;
}