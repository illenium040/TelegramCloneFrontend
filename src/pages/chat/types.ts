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
    chatToUser: ChatToUserDTO
    loading?: boolean
}

export enum MessageState {
    LOADING,
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

export interface FolderDTO {
    id: string
    name: string
    icon?: string
    userId: string
}

export interface ChatToUserDTO {
    id: string
    userId: string
    chatId: string
    targetUserId: string
    isPrivate?: boolean
    isArchived?: boolean
    IsNotified?: boolean
    IsPinned?: boolean
    IsBlocked?: boolean
    folders?: FolderDTO[]
}
