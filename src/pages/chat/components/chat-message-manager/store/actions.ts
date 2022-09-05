import { SignalRService } from 'common/services/signalR-services'
import { MessageToServer } from 'pages/chat/models/message'
import { Dispatch } from 'redux'
import { SendChatMessages, SendMessage } from './types'

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
