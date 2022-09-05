import { UserService } from 'common/services/user-service'
import { Dispatch } from 'redux'
import { FetchCurrentUser, FetchCurrentUserTypes } from './types'

const getUser = (name: string, userService: UserService) => {
    return userService.getUserByName(name)
}

const getUserDBG = async (userService: UserService) => {
    if (window.location.port === '3000') {
        return getUser('Виталий', userService)
    } else if (window.location.port === '3001') {
        return getUser('Давыда', userService)
    } else {
        return getUser('Олег', userService)
    }
}

export const fetchUser = (userService: UserService) => {
    return async (dispatch: Dispatch<FetchCurrentUser>) => {
        try {
            dispatch({ type: FetchCurrentUserTypes.FETCH })
            const response = await getUserDBG(userService)
            dispatch({ type: FetchCurrentUserTypes.FETCH_SUCCESS, payload: response })
        } catch (e) {
            dispatch({
                type: FetchCurrentUserTypes.FETCH_ERROR,
                payload: 'Произошла ошибка при получении пользователя'
            })
        }
    }
}
