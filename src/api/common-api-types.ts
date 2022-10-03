import { StatusCodes } from "http-status-codes"

export type CreateQuery = {
    userId: string
    withUserId: string
}

export type QueryInput = {
    userId: string
    chatId: string
}

export type QueryRead = {
    messagesId: string[]
    chatId: string
    userFromId: string
}

export type RequestResult<T = void> = {
    data?: T
    result: CommandResult
}

export type CommandResult = {
    succeeded: boolean
    errors?: string[]
    code: StatusCodes
}
