import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MessageDTO, MessageState } from "pages/chat/types"

export const loadableMessageSlice = createSlice({
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

export const loadableMessageAction = loadableMessageSlice.actions
export const loadableMessageReducer = loadableMessageSlice.reducer
