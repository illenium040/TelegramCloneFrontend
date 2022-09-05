import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { chatListReducer } from '../../pages/sidebar-chat-list/store/reducers'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { userReducer } from 'pages/App/store/reducers'
import ActionCreators from './action-creators'
import getChatMessagesReducer from 'pages/chat/components/chat-with-user/store/reducers'
import sendChatMessageReducer from 'pages/chat/components/chat-message-manager/store/reducers'

const rootReducer = combineReducers({
    chatListReducer,
    userReducer,
    getChatMessagesReducer,
    sendChatMessageReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: gDM => gDM().concat(thunk)
})

type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}
