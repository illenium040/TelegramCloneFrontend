import * as ChatListFetchActionCreators from 'pages/sidebar-chat-list/store/actions'
import * as GetChatActions from 'pages/chat/components/chat-with-user/store/actions'
import * as UserActions from 'pages/App/store/actions'
import * as SendChatMessageAction from 'pages/chat/components/chat-message-manager/store/actions'

export default {
    ...ChatListFetchActionCreators,
    ...UserActions,
    ...SendChatMessageAction,
    ...GetChatActions
}
