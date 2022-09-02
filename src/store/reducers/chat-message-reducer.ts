import { LoadingStateWithTError } from './../types/base-types';
import { MessageToServer } from './../../models/message-models';
import { GetChatMessages, GetMessages, SendChatMessages, SendErrorMessage, SendMessage } from './../types/fetch-message';
import { MessageDTO } from "../../models/message-models";
import { LoadingState } from "../types/base-types";
import { ChatDTO } from '../../models/chat-models';


export interface ChatMessagesState extends LoadingState {
    chat: ChatDTO | null;
}

export interface SendChatMessageState extends LoadingStateWithTError<SendErrorMessage> {
    message?: MessageDTO | null;
    sendedMessage: MessageToServer | null;
}


export const getChatMessagesReducer = (state: ChatMessagesState = {
    chat: null,
    loading: true,
    error: null
}, action: GetChatMessages): ChatMessagesState => {
    switch (action.type) {
        case GetMessages.FETCH:
            return { loading: true, chat: null, error: null };
        case GetMessages.SUCCESS:
            return { loading: false, error: null, chat: action.payload }
        case GetMessages.ERROR:
            return { error: action.payload, loading: false, chat: null }
        default:
            return state;
    }
}

export const sendChatMessageReducer = (state: SendChatMessageState =
    { error: null, loading: false, message: null, sendedMessage: null },
    action: SendChatMessages): SendChatMessageState => {
    switch (action.type) {
        case SendMessage.SEND:
        case SendMessage.SENDING:
            return { error: null, loading: true, sendedMessage: action.payload };
        case SendMessage.ERROR:
            return { error: action.payload, loading: false, sendedMessage: null };
        case SendMessage.SENDED:
            return { error: null, loading: false, message: null, sendedMessage: null };
        default:
            return state;
    }
}