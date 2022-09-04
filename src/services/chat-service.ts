import { serverHost } from './../extensions/axios-extensions'
import { ChatDTO, ChatListUnit } from '../models/chat-models'
import axios from 'axios'

export class ChatService {
    public async getChatList(userId: string) {
        return (await axios.get<ChatListUnit[]>(serverHost + `/api/db/chatlist/${userId}`))?.data
    }

    public async getChatMessages(chatId: string) {
        return (await axios.get<ChatDTO>(serverHost + `/api/db/chat/${chatId}`))?.data
    }
}
