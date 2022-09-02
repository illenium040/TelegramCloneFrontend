import { userReducer } from './reducers/user-reducer';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { chatListReducer } from "./reducers/chat-list-reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunk from 'redux-thunk';
import { getChatMessagesReducer, sendChatMessageReducer } from './reducers/chat-message-reducer';

const rootReducer = combineReducers({
    chatListReducer,
    userReducer,
    getChatMessagesReducer,
    sendChatMessageReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(thunk)
});

type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;