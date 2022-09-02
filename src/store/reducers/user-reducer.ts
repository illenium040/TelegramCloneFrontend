import { FetchCurrentUserTypes } from './../types/fetch-user';
import { UserDTO } from './../../models/user-models';
import { LoadingState } from './../types/base-types';
import { FetchCurrentUser } from '../types/fetch-user';

export interface UserState extends LoadingState {
    user: UserDTO | null;
}

const initialState = {
    user: null,
    loading: true,
    error: null
} as UserState;

export const userReducer = (state: UserState = initialState, action: FetchCurrentUser): UserState => {
    switch (action.type) {
        case FetchCurrentUserTypes.FETCH:
            return { loading: true, user: null, error: null };
        case FetchCurrentUserTypes.FETCH_SUCCESS:
            return { loading: false, error: null, user: action.payload };
        case FetchCurrentUserTypes.FETCH_ERROR:
            return { loading: false, error: action.payload, user: null }
        default:
            return state;
    }
}