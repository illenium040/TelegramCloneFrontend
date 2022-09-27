import { StatusCodes } from "http-status-codes"

export type RequestResult<T = void> = {
    data?: T
    result: CommandResult
}

export type CommandResult = {
    succeeded: boolean
    errors?: string[]
    code: StatusCodes
}
