export interface MessageDTO {
    id?: string
    created: Date
    userIdTo: string
    chatId: string
    content: string
    userIdFrom: string
}
