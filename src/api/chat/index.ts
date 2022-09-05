import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { serverHost } from 'common/constants'
import { ChatListUnit } from 'pages/chat/models/chat'

export const chatApi = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({ baseUrl: serverHost }),
    endpoints: build => ({
        getChatList: build.query<ChatListUnit[], string>({
            query: (userId: string) => `/api/db/chatlist/${userId}`
        })
    })
})

export const { useGetChatListQuery } = chatApi
