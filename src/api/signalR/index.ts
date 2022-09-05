import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { serverHost } from 'common/constants'
import { ChatDTO } from 'pages/chat/models/chat'
import { MessageDTO, MessageToServer } from 'pages/chat/models/message'

enum ChatEvent {
    Send = 'SendMessage',
    Receive = 'ReceiveMessage',
    ReceiveSended = 'MessageSended',
    SetHub = 'SetUserHub'
}

let socket: HubConnection

async function connect(userId: string) {
    const hub = new HubConnectionBuilder()
        .withUrl(serverHost + '/hubs/notifications')
        .withAutomaticReconnect()
        .build()
    await hub
        .start()
        .then(() => {
            console.log('Connection started')
        })
        .catch(err => {
            console.log('Error while starting connection: ' + err)
        })
    await hub?.send('SetUserHub', userId).then(x => console.log(`Hub is set for ${hub?.connectionId}!`))
    return hub
}

type QueryInput = {
    userId: string
    chatId: string
}

export const signalRApi = createApi({
    reducerPath: 'signalRApi',
    baseQuery: fetchBaseQuery({
        baseUrl: serverHost
    }),
    endpoints: builder => ({
        sendMessage: builder.mutation<MessageDTO, MessageToServer>({
            queryFn: (chatMessageContent: MessageToServer) => {
                return new Promise(resolve => {
                    socket.send(ChatEvent.Send, chatMessageContent)
                })
            }
        }),
        getChatMessages: builder.query<ChatDTO, QueryInput>({
            query: (input: QueryInput) => `/api/db/chat/${input.chatId}`,
            async onCacheEntryAdded(input, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                try {
                    await cacheDataLoaded
                    if (!socket) socket = await connect(input.userId)
                    socket.on(ChatEvent.Receive, (message: MessageDTO) => {
                        updateCachedData(draft => {
                            draft.messages.push(message)
                        })
                    })
                    socket.on(ChatEvent.ReceiveSended, (response: { chatID: string; message: MessageDTO }) => {
                        if (response.chatID === input.chatId) {
                            updateCachedData(draft => {
                                draft.messages.push(response.message)
                                console.log(input)
                            })
                        }
                    })
                    await cacheEntryRemoved
                    socket.off('connect')
                    socket.off(ChatEvent.Receive)
                    socket.off(ChatEvent.ReceiveSended)
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            }
        })
    })
})

export const { useGetChatMessagesQuery, useSendMessageMutation } = signalRApi
