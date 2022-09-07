import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { loadableSliceAction } from "api/chat"
import { serverHost } from "common/constants"
import { MessageState } from "pages/chat/components/chat-message"
import { ChatDTO } from "pages/chat/models/chat"
import { MessageDTO } from "pages/chat/models/message"

export enum ChatEvent {
    Send = "SendMessage",
    Receive = "ReceiveMessage",
    SetHub = "SetUserHub"
}

let socket: HubConnection

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
                return new Promise(resolve =>
                    new Promise(res => setTimeout(res, 1000)).then(async x => {
                        await socket.invoke(ChatEvent.Send, message)
                        resolve({ data: message })
                    })
                )
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
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded
                    const method = (message: MessageDTO) => {
                        if (message.chatId === arg.chatId) {
                            new Promise(res => setTimeout(res, 1000)).then(n => {
                                updateCachedData(draft => {
                                    draft.messages.push(message)
                                })
                                dispatch(loadableSliceAction.sendToUser(message))
                            })
                        }
                    }
                    socket?.on(ChatEvent.Receive, method)
                    await cacheEntryRemoved
                    socket?.off(ChatEvent.Receive, method)
                } catch {}
            }
        })
    })
})

export const { useGetChatMessagesQuery, useSendMessageMutation, useConnectQuery } = signalRApi
