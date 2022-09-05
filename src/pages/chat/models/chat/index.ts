import { MessageDTO } from '../message'
import { UserDTO } from '../../../../common/models/user-models'

export interface ChatDTO {
    id: string
    messages: MessageDTO[]
}

export interface ChatListUnit {
    user: UserDTO
    chatId: string
    unreadMessagesCount: number
    lastMessage?: MessageDTO
}
