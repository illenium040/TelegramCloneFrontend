import { MessageDTO } from "./message-models";
import { UserDTO } from "./user-models";

export interface ChatDTO {
    id: string;
    messages: MessageDTO[];
}

export interface ChatListUnit {
    user: UserDTO;
    chatId: string;
    unreadMessagesCount: number;
    lastMessage?: MessageDTO;
}

