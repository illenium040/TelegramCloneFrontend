import { useEffect } from 'react'
import { useInjection } from 'common/hooks/useInjection'
import MyMessage from '../chat-my-message'
import { useActions, useTypedSelector } from 'common/store'
import { MessageToServer } from 'pages/chat/models/message'
import { UserDTO } from 'common/models/user-models'
import Loading from 'pages/loading'

type MessageSendProps = {
    message: MessageToServer
    msgKey: string
    user: UserDTO
    onSended: (msgKey: string) => void
}

const MessageFromClient = (props: MessageSendProps) => {
    const { msgKey, message, user, onSended } = props
    const { error, loading, sendedMessage } = useTypedSelector(state => state.sendChatMessageReducer)
    const { sendChatMessage } = useActions()
    const { signalRService } = useInjection()

    useEffect(() => {
        sendChatMessage(message, signalRService)
    }, [])

    if (loading)
        return (
            <div>
                <MyMessage avatar={user.avatar} content={message.content} id={msgKey} time={new Date()} />
                <Loading />
            </div>
        )
    if (error) {
        return <div>{sendedMessage?.content + 'with error: ' + error.error}</div>
    }

    if (!loading && !error) onSended(msgKey)

    return <></>
}

export default MessageFromClient