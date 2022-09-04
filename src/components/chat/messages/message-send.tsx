import { useEffect } from 'react'
import { useInjection } from '../../../hooks/useInjection'
import { MessageToServer } from '../../../models/message-models'
import { UserDTO } from '../../../models/user-models'
import { useTypedSelector } from '../../../store/store'
import { useActions } from '../../../store/use-actions'
import { Loading } from '../../helpers/loading'
import { MyMessage } from './my-message'

type MessageSendProps = {
    message: MessageToServer
    msgKey: string
    user: UserDTO
    onSended: (msgKey: string) => void
}

export const MessageFromClient = (props: MessageSendProps) => {
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
