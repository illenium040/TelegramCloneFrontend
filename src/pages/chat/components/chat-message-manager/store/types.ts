import { IType, ITypeWithPayload } from 'common/store/types/base-types'
import { ChatDTO } from 'pages/chat/models/chat'
import { MessageToServer } from 'pages/chat/models/message'

export enum SendMessage {
    SEND = 'SEND_CHAT_MESSAGE',
    SENDING = 'SENDING_CHAT_MESSAGE',
    SENDED = 'CHAT_MESSAGE_SENDED',
    ERROR = 'CHAT_MESSAGE_ERROR'
}

export type SendErrorMessage = {
    error: string
    senedeMessage: MessageToServer
}

export type SendChatMessages =
    | ITypeWithPayload<MessageToServer, SendMessage.SEND>
    | ITypeWithPayload<MessageToServer, SendMessage.SENDING>
    | IType<SendMessage.SENDED>
    | ITypeWithPayload<SendErrorMessage, SendMessage.ERROR>
