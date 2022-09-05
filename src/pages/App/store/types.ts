import { UserDTO } from 'common/models/user-models'
import { IType, ITypeWithPayload } from 'common/store/types/base-types'

export enum FetchCurrentUserTypes {
    FETCH = 'FETCH_CURRENT_USER',
    FETCH_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS',
    FETCH_ERROR = 'FETCH_CURRENT_USER_ERROR'
}

export type FetchCurrentUser =
    | IType<FetchCurrentUserTypes.FETCH>
    | ITypeWithPayload<UserDTO, FetchCurrentUserTypes.FETCH_SUCCESS>
    | ITypeWithPayload<string, FetchCurrentUserTypes.FETCH_ERROR>
