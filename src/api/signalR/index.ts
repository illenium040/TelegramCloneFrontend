import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { decreaseUnreadMessageCounter, updateMessagesCash } from "api/cashActions"
import { QueryInput, QueryRead, RequestResult } from "api/common-api-types"
import { serverHost } from "common/constants"
import WebSocketSignalR, { WebSocketEvents } from "common/websocket"
import { ChatDTO, ChatView, MessageDTO, MessageState } from "pages/chat/types"

export const signalRApi = createApi({
    reducerPath: "signalRApi",
    baseQuery: fetchBaseQuery({
        baseUrl: serverHost,
        prepareHeaders: headers => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
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
                    if (message.userIdFrom === message.userIdTo) {
                        await WebSocketSignalR.socket?.invoke(WebSocketEvents.SendToMe, message)
                    } else {
                        await WebSocketSignalR.socket?.invoke(WebSocketEvents.Send, message)
                    }
                    resolve({ data: message })
                })
            },
            async onQueryStarted(message, { dispatch, queryFulfilled }) {
                dispatch(updateMessagesCash(message, msg => (msg.state = MessageState.LOADING)))
                try {
                    const { data } = await queryFulfilled
                } catch (err) {
                    dispatch(updateMessagesCash(message, msg => (msg.state = MessageState.ERROR)))
                }
            }
        }),
        getChatMessages: builder.query<RequestResult<ChatDTO>, QueryInput>({
            query: (input: QueryInput) => `/api/chat/messages/${input.chatId}`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
                try {
                    await cacheDataLoaded
                    const onReceive = (message: MessageDTO, unit?: ChatView) => {
                        if (message.chatId === arg.chatId) {
                            if (message.userIdFrom !== arg.userId) {
                                updateCachedData(d => {
                                    d.data?.messages.push(message)
                                })
                            } else {
                                dispatch(updateMessagesCash(message, msg => (msg.state = message.state)))
                            }
                        }
                    }
                    const onRead = (messagesId: string[], chatId: string, targetUserId: string) => {
                        if (arg.chatId === chatId) {
                            updateCachedData(draft => {
                                let count = 0
                                for (let id of messagesId) {
                                    let m = draft.data?.messages.find(x => x.id === id)
                                    if (!m) continue
                                    m.state = MessageState.READ
                                    count++
                                }
                                dispatch(decreaseUnreadMessageCounter(arg.userId, arg.chatId, targetUserId, count))
                            })
                        }
                    }
                    const onReceiveFromMe = (message: MessageDTO) => {
                        dispatch(updateMessagesCash(message, msg => (msg.state = message.state)))
                    }
                    WebSocketSignalR.socket?.on(WebSocketEvents.Receive, onReceive)
                    WebSocketSignalR.socket?.on(WebSocketEvents.Read, onRead)
                    WebSocketSignalR.socket?.on(WebSocketEvents.SendToMe, onReceiveFromMe)
                    await cacheEntryRemoved
                    WebSocketSignalR.socket?.off(WebSocketEvents.Receive, onReceive)
                    WebSocketSignalR.socket?.off(WebSocketEvents.Read, onRead)
                    WebSocketSignalR.socket?.off(WebSocketEvents.SendToMe, onReceiveFromMe)
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
