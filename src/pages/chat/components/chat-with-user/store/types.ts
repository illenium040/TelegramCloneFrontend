import { ChatDTO } from 'pages/chat/models/chat'
import { IType, ITypeWithPayload } from 'common/store/types/base-types'

export enum GetMessages {
    FETCH = 'GET_CHAT_MESSAGED',
    ERROR = 'GOT_CHAT_MESSAGES_ERROR',
    SUCCESS = 'GOT_CHAT_MESSAGES'
}

export type GetChatMessages =
    | IType<GetMessages.FETCH>
    | ITypeWithPayload<ChatDTO, GetMessages.SUCCESS>
    | ITypeWithPayload<string, GetMessages.ERROR>
