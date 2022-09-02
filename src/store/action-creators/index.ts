import * as ChatListFetchActionCreators from './chat-list'
import * as UserFetchActionCreator from './user';
import * as MessageFetchActionReducers from './chat-message';
export default {
    ...ChatListFetchActionCreators,
    ...UserFetchActionCreator,
    ...MessageFetchActionReducers,
}