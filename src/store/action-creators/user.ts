import { FetchCurrentUser, FetchCurrentUserTypes } from './../types/fetch-user';
import { Dispatch } from 'redux';
import { SignalRService } from '../../services/signalR-services';
import { UserService } from '../../services/user-service';

const userService = new UserService();

const getUser = (name: string) => {
    return userService.getUserByName(name)
        .then(async (x) => {
            await SignalRService.getInstanceOf().init(x.id);
            return x;
        });
}

const getUserDBG = async () => {
    if (window.location.port === '3000') { return getUser("Виталий"); }
    else if (window.location.port === '3001') { return getUser("Давыда"); }
    else { return getUser("Олег"); }
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
