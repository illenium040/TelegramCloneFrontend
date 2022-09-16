import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RequestResult } from "api/common-api-types"
import { serverHost } from "common/constants"
import WebSocketSignalR, { WebSocketEvents } from "common/websocket"
import { ChatListUnit } from "pages/chat/models/chat"
import { MessageDTO, MessageState } from "pages/chat/models/message"

export const loadableSlice = createSlice({
    name: "loadable",
    initialState: [] as MessageDTO[],
    reducers: {
        load: (state, payload: PayloadAction<MessageDTO>) => {
            state.push(payload.payload)
        },
        sendToServer: (state, payload: PayloadAction<MessageDTO>) => {
            const index = state.findIndex(x => x.id === payload.payload.id)
            if (index > -1) state[index].state = MessageState.SENDED_TO_SERVER
        },
        sendToUser: (state, payload: PayloadAction<MessageDTO>) => {
            const index = state.findIndex(x => x.id === payload.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        onError: (state, payload: PayloadAction<MessageDTO>) => {
            const index = state.findIndex(x => x.id === payload.payload.id)
            if (index > -1) state[index].state = MessageState.ERROR
        }
    }
})

export const chatApi = createApi({
    reducerPath: "chatAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: serverHost,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: build => ({
        getChatList: build.query<RequestResult<ChatListUnit[]>, string>({
            query: (userId: string) => `/api/chat/list/${userId}`,
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                await cacheDataLoaded
                WebSocketSignalR.socket?.on(WebSocketEvents.Receive, (message: MessageDTO) => {
                    updateCachedData(d => {
                        if (!d.data) return
                        const curChat = d.data.find(x => x.chatId === message.chatId)
                        if (curChat) {
                            message.state = MessageState.SENDED_TO_USER
                            curChat.lastMessage = message
                            if (message.userIdTo !== curChat.user.id) {
                                curChat.unreadMessagesCount += 1
                            }
                        }
                    })
                })
                WebSocketSignalR.socket?.on(
                    WebSocketEvents.Read,
                    (messagesIds: string[], chatId: string, targetUserId: string) => {
                        updateCachedData(d => {
                            if (!d.data) return
                            const curChat = d.data.find(x => x.chatId === chatId)
                            if (curChat) {
                                if (targetUserId === curChat.user.id) curChat.unreadMessagesCount -= messagesIds.length
                            }
                        })
                    }
                )
                await cacheEntryRemoved
            }
        })
    })
})

export const { useGetChatListQuery } = chatApi
export const loadableSliceAction = loadableSlice.actions
export const loadableSliceReducer = loadableSlice.reducer
