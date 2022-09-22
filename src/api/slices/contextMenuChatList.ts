import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CtxMCLPayload = {
    loading: boolean
    chatId: string
}

export const contextMenuChatListSlice = createSlice({
    name: "CtxChatListMenu",
    initialState: {
        loading: false,
        chatId: ""
    } as CtxMCLPayload,
    reducers: {
        loading: (state, p: PayloadAction<CtxMCLPayload>) => {
            state.loading = p.payload.loading
            state.chatId = p.payload.chatId
        }
    }
})

export const ctxMenuChatListActions = contextMenuChatListSlice.actions
export const ctxMenuChatListReducer = contextMenuChatListSlice.reducer
