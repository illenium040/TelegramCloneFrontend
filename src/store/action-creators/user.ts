import { FetchCurrentUser, FetchCurrentUserTypes } from './../types/fetch-user';
import { Dispatch } from 'redux';
import { SignalRService } from '../../services/signalR-services';
import { UserService } from '../../services/user-service';

const userService = new UserService();

const getUser = (index: number) => {
    return userService.getUserByIndex(index)
        .then(async (x) => {
            await SignalRService.getInstanceOf().init(x.id);
            return x;
        });
}

const getUserDBG = async () => {
    if (window.location.port === '3000') { return getUser(0); }
    else { return getUser(1); }
}

export const fetchUser = () => {
    return async (dispatch: Dispatch<FetchCurrentUser>) => {
        try {
            dispatch({ type: FetchCurrentUserTypes.FETCH })
            const response = await getUserDBG();
            dispatch({ type: FetchCurrentUserTypes.FETCH_SUCCESS, payload: response });
        } catch (e) {
            dispatch({
                type: FetchCurrentUserTypes.FETCH_ERROR,
                payload: 'Произошла ошибка при получении пользователя'
            })
        }
    }
}
