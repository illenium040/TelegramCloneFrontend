import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { loadableSliceAction } from "api/chat"
import { serverHost } from "common/constants"
import { ChatDTO } from "pages/chat/models/chat"
import { MessageDTO, MessageState } from "pages/chat/models/message"

export enum ChatEvent {
    Send = "SendMessage",
    Receive = "ReceiveMessage",
    SetHub = "SetUserHub",
    Read = "ReadMessages"
}

export let socket: HubConnection

async function connect(userId: string) {
    const hub = new HubConnectionBuilder()
        .withUrl(serverHost + "/hubs/notifications")
        .withAutomaticReconnect()
        .build()
    await hub
        .start()
        .then(() => {
            console.log("Connection started")
        })
        .catch(err => {
            console.log("Error while starting connection: " + err)
        })
    await hub?.send("SetUserHub", userId).then(x => console.log(`Hub is set for ${hub?.connectionId}!`))
    return hub
}

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
        connect: builder.query<HubConnection, string>({
            queryFn: (userId: string) => {
                return new Promise(resolve => {
                    if (!socket)
                        connect(userId).then(hubConnection => {
                            socket = hubConnection
                            resolve({ data: socket })
                        })
                })
            }
        }),
        sendMessage: builder.mutation<MessageDTO, MessageDTO>({
            queryFn: (message: MessageDTO) => {
                return new Promise(async resolve => {
                    await socket.invoke(ChatEvent.Send, message)
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
                            console.log("ReadCallback")
                            console.log(messagesId)
                            updateCachedData(draft => {
                                for (let id of messagesId) {
                                    let m = draft.messages.find(x => x.id === id)
                                    if (!m) continue
                                    m.state = MessageState.READ
                                }
                            })
                        }
                    }

                    socket?.on(ChatEvent.Receive, onReceive)
                    socket?.on(ChatEvent.Read, onRead)
                    await cacheEntryRemoved
                    socket?.off(ChatEvent.Receive, onReceive)
                    socket?.off(ChatEvent.Read, onRead)
                } catch {}
            }
        }),
        readMessage: builder.mutation<QueryRead, QueryRead>({
            queryFn: (input: QueryRead) => {
                return new Promise(async resolve => {
                    await socket.invoke("ReadMessage", input.messagesId, input.chatId, input.userFromId)
                    resolve({ data: input })
                })
            }
        })
    })
})

export const { useGetChatMessagesQuery, useSendMessageMutation, useConnectQuery, useReadMessageMutation } = signalRApi
