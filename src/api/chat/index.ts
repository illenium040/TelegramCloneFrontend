import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RequestResult } from "api/common-api-types"
import { serverHost } from "common/constants"
import WebSocketSignalR, { WebSocketEvents, WSChatListEvents } from "common/websocket"
import { ChatView, MessageDTO, MessageState } from "pages/chat/types"

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

type DeleteQuery = {
    userId: string
    chatId: string
}

type CreateQuery = {
    userId: string
    withUserId: string
}

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
        addChat: build.mutation<RequestResult<string>, CreateQuery>({
            query: queryBody => ({
                url: `/api/chat/add`,
                body: queryBody,
                method: "POST"
            })
        }),
        deleteChat: build.mutation<RequestResult<string>, DeleteQuery>({
            query: queryBody => ({
                url: `/api/chat/delete`,
                body: queryBody,
                method: "POST"
            })
        }),
        getChatList: build.query<RequestResult<ChatView[]>, string>({
            query: userId => `/api/chat/list/${userId}`,
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                await cacheDataLoaded
                WebSocketSignalR.socket?.on(WebSocketEvents.Receive, (message: MessageDTO, unit?: ChatView) => {
                    updateCachedData(d => {
                        if (!d.data) return
                        if (unit) {
                            d.data.push(unit)
                        }
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

                WebSocketSignalR.socket?.on(WSChatListEvents.Add, (chat: ChatView) => {
                    updateCachedData(d => {
                        const c = d.data?.findIndex(x => x.chatId === chat.chatId)
                        if (c && c === -1) {
                            d.data?.push(chat)
                        }
                    })
                })
                WebSocketSignalR.socket?.on(WSChatListEvents.Delete, (chat: ChatView) => {
                    updateCachedData(d => {
                        if (!d.data) return
                        const c = d.data?.findIndex(x => x.chatId === chat.chatId)
                        if (c > -1) {
                            d.data?.splice(c, 1)
                        }
                    })
                })

                await cacheEntryRemoved
            }
        })
    })
})

export const { useGetChatListQuery, useAddChatMutation, useDeleteChatMutation } = chatApi
export const loadableSliceAction = loadableSlice.actions
export const loadableSliceReducer = loadableSlice.reducer
