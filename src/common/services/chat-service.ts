import { ChatDTO, ChatListUnit } from '../../pages/chat/models/chat'
import axios from 'axios'
import { serverHost } from 'common/constants'

export class ChatService {
    public async getChatList(userId: string) {
        return (await axios.get<ChatListUnit[]>(serverHost + `/api/db/chatlist/${userId}`))?.data
    }

    public async getChatMessages(chatId: string) {
        return (await axios.get<ChatDTO>(serverHost + `/api/db/chat/${chatId}`))?.data
    }
}
