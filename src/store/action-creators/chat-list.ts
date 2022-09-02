import { ChatService } from '../../services/chat-service';
import { Dispatch } from 'redux';
import { FetchChatList, FetchChatListActionTypes } from '../types/fetch-chatlist';

export const fetchChatList = (chatService: ChatService, userId: string) => {
    return async (dispatch: Dispatch<FetchChatList>) => {
        try {
            dispatch({ type: FetchChatListActionTypes.FETCH })
            const response = await chatService.getChatList(userId);
            dispatch({ type: FetchChatListActionTypes.FETCH_SUCCESS, payload: response });
        } catch (e) {
            dispatch({
                type: FetchChatListActionTypes.FETCH_ERROR,
                payload: 'Произошла ошибка при загрузке списка чатов'
            })
        }
    }
}