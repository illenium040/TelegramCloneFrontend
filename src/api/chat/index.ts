import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { serverHost } from "common/constants"
import { MessageState } from "pages/chat/components/chat-message"
import { ChatListUnit } from "pages/chat/models/chat"
import { MessageDTO } from "pages/chat/models/message"

export type LoadableMessage = {
    message: MessageDTO
    state: MessageState
}

export const loadableSlice = createSlice({
    name: "loadable",
    initialState: [] as LoadableMessage[],
    reducers: {
        load: (state, payload: PayloadAction<MessageDTO>) => {
            state.push({ message: payload.payload, state: MessageState.LOADING })
        },
        sendToServer: (state, payload: PayloadAction<MessageDTO>) => {
            const index = state.findIndex(x => x.message.id === payload.payload.id)
            if (index > -1) state[index].state = MessageState.SENDED_TO_SERVER
        },
        sendToUser: (state, payload: PayloadAction<MessageDTO>) => {
            const index = state.findIndex(x => x.message.id === payload.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        onError: (state, payload: PayloadAction<MessageDTO>) => {
            const index = state.findIndex(x => x.message.id === payload.payload.id)
            if (index > -1) state[index].state = MessageState.ERROR
        }
    }
})

export const chatApi = createApi({
    reducerPath: "chatAPI",
    baseQuery: fetchBaseQuery({ baseUrl: serverHost }),
    endpoints: build => ({
        getChatList: build.query<ChatListUnit[], string>({
            query: (userId: string) => `/api/db/chatlist/${userId}`
        })
    })
})

export const { useGetChatListQuery } = chatApi
export const loadableSliceAction = loadableSlice.actions
export const loadableSliceReducer = loadableSlice.reducer
