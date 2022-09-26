import { UserDTO } from "common/models/user-models"
import { ChatView } from "pages/chat/types"
import { v4 } from "uuid"

export const createEmptyChatView = (user: UserDTO, id: string = ""): ChatView => {
    return {
        chatId: id,
        user: user,
        chatToUser: {
            chatId: id,
            userId: user.id,
            targetUserId: "",
            folders: [],
            id: v4()
        },
        unreadMessagesCount: 0,
        lastMessage: undefined
    }
}
