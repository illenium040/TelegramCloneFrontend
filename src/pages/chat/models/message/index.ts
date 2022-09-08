export enum MessageState {
    LOADING,
    SENDED_TO_SERVER,
    SENDED_TO_USER,
    READ,
    ERROR
}

export enum MessageContentType {
    Text = 1,
    Video = 2,
    Audio = 4,
    Image = 8
}

export interface MessageDTO {
    id: string
    userIdTo: string
    chatId: string
    content: string
    userIdFrom: string
    state: MessageState
    contentType: MessageContentType
    created: Date
}
