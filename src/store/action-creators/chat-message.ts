import { SignalRService } from './../../services/signalR-services'
import { MessageToServer } from './../../models/message-models'
import { GetChatMessages, GetMessages, SendChatMessages, SendMessage } from './../types/fetch-message'
import { Dispatch } from 'redux'
import { ChatService } from '../../services/chat-service'

export const getChatMessages = (chatId: string, chatService: ChatService) => {
    return async (dispatch: Dispatch<GetChatMessages>) => {
        try {
            dispatch({ type: GetMessages.FETCH })
            const response = await chatService.getChatMessages(chatId)
            dispatch({ type: GetMessages.SUCCESS, payload: response })
        } catch (e) {
            dispatch({
                type: GetMessages.ERROR,
                payload: 'Произошла ошибка при загрузке списка чатов'
            })
        }
    }
}

export const sendChatMessage = (message: MessageToServer, signalR: SignalRService) => {
    return async (dispatch: Dispatch<SendChatMessages>) => {
        try {
            dispatch({ type: SendMessage.SEND, payload: message })
            await signalR.sendMessage(message)
            dispatch({ type: SendMessage.SENDED })
        } catch (e) {
            dispatch({
                type: SendMessage.ERROR,
                payload: {
                    error: 'Произошла ошибка при отправке сообщения',
                    senedeMessage: message
                }
            })
        }
    }
}
