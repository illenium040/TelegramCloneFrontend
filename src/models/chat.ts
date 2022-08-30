export interface UsersChat {
    user: User;
    messages?: Message[];
    myMessages?: Message[];
}

export interface User {
    name: string;
    avatar?: string;
    chats?: UsersChat[];
}

export interface Message {
    content: string;
    date: Date;
    isRead: boolean;
}