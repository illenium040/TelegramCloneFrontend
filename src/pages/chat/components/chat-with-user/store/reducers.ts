import { ChatDTO } from 'pages/chat/models/chat'
import { LoadingState } from 'common/store/types/base-types'
import { GetChatMessages, GetMessages } from './types'

export interface ChatMessagesState extends LoadingState {
    chat: ChatDTO | null
}

const getChatMessagesReducer = (
    state: ChatMessagesState = {
        chat: null,
        loading: true,
        error: null
    },
    action: GetChatMessages
): ChatMessagesState => {
    switch (action.type) {
        case GetMessages.FETCH:
            return { loading: true, chat: null, error: null }
        case GetMessages.SUCCESS:
            return { loading: false, error: null, chat: action.payload }
        case GetMessages.ERROR:
            return { error: action.payload, loading: false, chat: null }
        default:
            return state
    }
}

export default getChatMessagesReducer
