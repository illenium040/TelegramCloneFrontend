import { ChatListUnit } from 'pages/chat/models/chat'
import { LoadingState } from 'common/store/types/base-types'
import { FetchChatList, FetchChatListActionTypes } from './types'

export interface ChatListState extends LoadingState {
    chatList: ChatListUnit[]
}

const initialState = {
    chatList: [],
    loading: true,
    error: null
}

export const chatListReducer = (state: ChatListState = initialState, action: FetchChatList): ChatListState => {
    switch (action.type) {
        case FetchChatListActionTypes.FETCH:
            return { loading: true, chatList: [], error: null }
        case FetchChatListActionTypes.FETCH_SUCCESS:
            return { loading: false, error: null, chatList: action.payload }
        case FetchChatListActionTypes.FETCH_ERROR:
            return { loading: false, error: action.payload, chatList: [] }
        default:
            return state
    }
}
