import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { loadableSliceAction } from "api/chat"
import { serverHost } from "common/constants"
import WebSocketSignalR, { WebSocketEvents } from "common/websocket"
import { ChatDTO } from "pages/chat/models/chat"
import { MessageDTO, MessageState } from "pages/chat/models/message"

type QueryInput = {
    userId: string
    chatId: string
}

type QueryRead = {
    messagesId: string[]
    chatId: string
    userFromId: string
}

export const signalRApi = createApi({
    reducerPath: "signalRApi",
    baseQuery: fetchBaseQuery({
        baseUrl: serverHost
    }),
    endpoints: builder => ({
        connect: builder.query<void, string>({
            queryFn: (userId: string) => {
                return new Promise(resolve => {
                    if (!WebSocketSignalR.isConnected)
                        WebSocketSignalR.connect(userId).then(() => resolve({ data: undefined }))
                })
            }
        }),
        sendMessage: builder.mutation<MessageDTO, MessageDTO>({
            queryFn: (message: MessageDTO) => {
                return new Promise(async resolve => {
                    await WebSocketSignalR.socket?.send(WebSocketEvents.Send, message)
                    resolve({ data: message })
                })
            },
            async onQueryStarted(message, { dispatch, queryFulfilled }) {
                dispatch(loadableSliceAction.load(message))
                try {
                    const { data } = await queryFulfilled
                    dispatch(loadableSliceAction.sendToServer(data))
                } catch (err) {
                    dispatch(loadableSliceAction.onError(message))
                }
            }
        }),
        getChatMessages: builder.query<ChatDTO, QueryInput>({
            query: (input: QueryInput) => `/api/db/chat/${input.chatId}`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
                try {
                    await cacheDataLoaded
                    const onReceive = (message: MessageDTO) => {
                        if (message.chatId === arg.chatId) {
                            dispatch(loadableSliceAction.sendToUser(message))
                            updateCachedData(draft => {
                                draft.messages.push(message)
                            })
                        }
                    }
                    const onRead = (messagesId: string[], chatId: string, targetUserId: string) => {
                        if (arg.chatId === chatId) {
                            updateCachedData(draft => {
                                for (let id of messagesId) {
                                    let m = draft.messages.find(x => x.id === id)
                                    if (!m) continue
                                    m.state = MessageState.READ
                                }
                            })
                        }
                    }

                    WebSocketSignalR.socket?.on(WebSocketEvents.Receive, onReceive)
                    WebSocketSignalR.socket?.on(WebSocketEvents.Read, onRead)
                    await cacheEntryRemoved
                    WebSocketSignalR.socket?.off(WebSocketEvents.Receive, onReceive)
                    WebSocketSignalR.socket?.off(WebSocketEvents.Read, onRead)
                } catch {}
            }
        }),
        readMessage: builder.mutation<QueryRead, QueryRead>({
            queryFn: (input: QueryRead) => {
                return new Promise(async resolve => {
                    await WebSocketSignalR.socket?.invoke(
                        WebSocketEvents.Read,
                        input.messagesId,
                        input.chatId,
                        input.userFromId
                    )
                    resolve({ data: input })
                })
            }
        })
    })
})

export const { useGetChatMessagesQuery, useSendMessageMutation, useConnectQuery, useReadMessageMutation } = signalRApi
