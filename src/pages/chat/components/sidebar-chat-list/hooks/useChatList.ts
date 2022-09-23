import { useGetChatListQuery } from "api/chat"
import { useAuthContext } from "pages/Auth/hooks/useAuth"

export const useChatList = () => {
    const user = useAuthContext()
    const chatViewQuery = useGetChatListQuery(user.id)
    const isViewLoading = chatViewQuery.isLoading || chatViewQuery.isFetching
    const chatViews = chatViewQuery.data?.data
    return { isViewLoading, chatViews }
}
