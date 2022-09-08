import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { serverHost } from "common/constants"
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
