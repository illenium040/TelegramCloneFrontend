import { ChatListUnit } from "../../models/chat-models";
import { ITypeWithPayload, IType } from "./base-types";

export enum FetchChatListActionTypes {
    FETCH = 'FETCH_CHAT_LIST',
    FETCH_SUCCESS = 'FETCH_CHAT_LIST_SUCCESS',
    FETCH_ERROR = 'FETCH_CHAT_LIST_ERROR',
}

export type FetchChatList = IType<FetchChatListActionTypes.FETCH> |
    ITypeWithPayload<ChatListUnit[], FetchChatListActionTypes.FETCH_SUCCESS> |
    ITypeWithPayload<string, FetchChatListActionTypes.FETCH_ERROR>