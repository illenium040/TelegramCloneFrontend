import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RequestResult } from "api/common-api-types"
import { serverHost } from "common/constants"
import WebSocketSignalR, { WebSocketEvents } from "common/websocket"
import { ChatView, MessageDTO, MessageState } from "pages/chat/types"

type ChatQuery = {
    userId: string
    chatId: string
}

type CreateQuery = {
    userId: string
    withUserId: string
}

const updateQueryData = (query: ChatQuery, action: (view: ChatView, data?: ChatView[], index?: number) => void) => {
    return chatApi.util.updateQueryData("getChatList", query.userId, d => {
        if (!d.data) return
        const c = d.data?.findIndex(x => x.chatId === query.chatId)
        if (c > -1) {
            action(d.data[c], d.data, c)
        }
    })
}

export const chatApi = createApi({
    reducerPath: "chatAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: serverHost,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: build => ({
        addChat: build.mutation<RequestResult<string>, CreateQuery>({
            query: queryBody => ({
                url: `/api/chat/add`,
                body: queryBody,
                method: "POST"
            })
        }),
        deleteChat: build.mutation<RequestResult<string>, ChatQuery>({
            query: queryBody => ({
                url: `/api/chat/delete`,
                body: queryBody,
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(updateQueryData(arg, view => (view.loading = true)))
                    await queryFulfilled
                    dispatch(updateQueryData(arg, (view, data, index) => data?.splice(index!, 1)))
                } catch {}
            }
        }),
        archiveChat: build.mutation<RequestResult<boolean>, ChatQuery>({
            query: queryBody => ({
                url: `/api/chat/archive?userId=${queryBody.userId}&chatId=${queryBody.chatId}`,
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(updateQueryData(arg, view => (view.loading = true)))
                    const is = await queryFulfilled
                    dispatch(
                        updateQueryData(arg, view => {
                            view.chatToUser.isArchived = is.data.data
                            view.loading = false
                        })
                    )
                } catch {}
            }
        }),
        togglePin: build.mutation<RequestResult<boolean>, ChatQuery>({
            query: queryBody => ({
                url: `/api/chat/togglePin?userId=${queryBody.userId}&chatId=${queryBody.chatId}`,
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(updateQueryData(arg, view => (view.loading = true)))
                    const is = await queryFulfilled
                    dispatch(
                        updateQueryData(arg, view => {
                            view.chatToUser.IsPinned = is.data.data
                            view.loading = false
                        })
                    )
                } catch {}
            }
        }),
        toggleNotifications: build.mutation<RequestResult<boolean>, ChatQuery>({
            query: queryBody => ({
                url: `/api/chat/toggleNotifications?userId=${queryBody.userId}&chatId=${queryBody.chatId}`,
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(updateQueryData(arg, view => (view.loading = true)))
                    const is = await queryFulfilled
                    dispatch(
                        updateQueryData(arg, view => {
                            view.chatToUser.IsNotified = is.data.data
                            view.loading = false
                        })
                    )
                } catch {}
            }
        }),
        block: build.mutation<RequestResult<boolean>, ChatQuery>({
            query: queryBody => ({
                url: `/api/chat/block?userId=${queryBody.userId}&chatId=${queryBody.chatId}`,
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(updateQueryData(arg, view => (view.loading = true)))
                    const is = await queryFulfilled
                    dispatch(
                        updateQueryData(arg, view => {
                            view.chatToUser.IsBlocked = is.data.data
                            view.loading = false
                        })
                    )
                } catch {}
            }
        }),
        getChatList: build.query<RequestResult<ChatView[]>, string>({
            query: userId => `/api/chat/list/${userId}`,
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }) {
                await cacheDataLoaded
                WebSocketSignalR.socket?.on(WebSocketEvents.Receive, (message: MessageDTO, unit?: ChatView) => {
                    updateCachedData(d => {
                        if (!d.data) return
                        if (unit) {
                            d.data.push(unit)
                        }
                        const curChat = d.data.find(x => x.chatId === message.chatId)
                        if (curChat) {
                            message.state = MessageState.SENDED_TO_USER
                            curChat.lastMessage = message
                            if (message.userIdTo !== curChat.user.id) {
                                curChat.unreadMessagesCount += 1
                            }
                        }
                    })
                })

                WebSocketSignalR.socket?.on(
                    WebSocketEvents.Read,
                    (messagesIds: string[], chatId: string, targetUserId: string) => {
                        updateCachedData(d => {
                            if (!d.data) return
                            const curChat = d.data.find(x => x.chatId === chatId)
                            if (curChat) {
                                if (targetUserId === curChat.user.id) curChat.unreadMessagesCount -= messagesIds.length
                            }
                        })
                    }
                )

                await cacheEntryRemoved
            }
        })
    })
})

export const {
    useGetChatListQuery,
    useAddChatMutation,
    useDeleteChatMutation,
    useArchiveChatMutation,
    useTogglePinMutation,
    useToggleNotificationsMutation,
    useBlockMutation
} = chatApi
