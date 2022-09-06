import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { serverHost } from "common/constants"
import { ChatDTO } from "pages/chat/models/chat"
import { MessageDTO } from "pages/chat/models/message"

enum ChatEvent {
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
        sendMessage: builder.mutation<void, MessageDTO>({
            queryFn: (chatMessageContent: MessageDTO) => {
                return new Promise(resolve =>
                    new Promise(res => setTimeout(res, 1000)).then(n => {
                        socket.invoke(ChatEvent.Send, chatMessageContent).then(x => resolve({ data: undefined }))
                    })
                )
            }
        }),
        getChatMessages: builder.query<ChatDTO, QueryInput>({
            query: (input: QueryInput) => `/api/db/chat/${input.chatId}`,
            async onCacheEntryAdded(input, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                try {
                    await cacheDataLoaded
                    if (!socket) socket = await connect(input.userId)
                    socket.on(ChatEvent.Receive, (message: MessageDTO) => {
                        if (message.chatId === input.chatId) {
                            updateCachedData(draft => {
                                draft.messages.push(message)
                            })
                        }
                    })
                    await cacheEntryRemoved
                    socket.off("connect")
                    socket.off(ChatEvent.Receive)
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            }
        })
    })
})

export const { useGetChatMessagesQuery, useSendMessageMutation } = signalRApi
