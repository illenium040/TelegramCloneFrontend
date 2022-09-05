import { Dispatch } from 'redux'
import { ChatService } from 'common/services/chat-service'
import { GetChatMessages, GetMessages } from './types'

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
