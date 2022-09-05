import { LoadingStateWithTError } from 'common/store/types/base-types'
import { MessageToServer } from 'pages/chat/models/message'
import { SendChatMessages, SendErrorMessage, SendMessage } from './types'

export interface SendChatMessageState extends LoadingStateWithTError<SendErrorMessage> {
    sendedMessage: MessageToServer | null
}

const sendChatMessageReducer = (
    state: SendChatMessageState = { error: null, loading: true, sendedMessage: null },
    action: SendChatMessages
): SendChatMessageState => {
    switch (action.type) {
        case SendMessage.SEND:
            return { error: null, loading: true, sendedMessage: action.payload }
        case SendMessage.ERROR:
            return { error: action.payload, loading: false, sendedMessage: null }
        case SendMessage.SENDED:
            return { error: null, loading: false, sendedMessage: null }
        default:
            return state
    }
}

export default sendChatMessageReducer
