import { StatusCodes } from "http-status-codes"

export type RequestResult<T = void> = {
    succeeded: boolean
    errors?: string[]
    code: StatusCodes
    data?: T
}
