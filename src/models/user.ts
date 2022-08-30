import { ChatModel, Message } from "./chat";

export interface UserChatList {
    id: string;
    chatList?: ChatModel[];
}

export interface UserDTO {
    id: string;
    name: string;
    avatar?: string;
    last_date: string;
}

export interface UserChatDTO extends UserDTO {
    chatId: string;
    messages?: Message[];
}
