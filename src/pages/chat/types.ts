import { UserDTO } from "common/models/user-models"

export interface ChatDTO {
    id: string
    userIdFrom: string
    messages: MessageDTO[]
}

export interface ChatView {
    user: UserDTO
    chatId: string
    unreadMessagesCount: number
    lastMessage?: MessageDTO
}

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
