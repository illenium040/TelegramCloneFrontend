import { useEffect } from 'react'
import { useInjection } from 'common/hooks/useInjection'
import MyMessage from '../chat-my-message'
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

    // if (loading)
    //     return (
    //         <div>
    //             <MyMessage avatar={user.avatar} content={message.content} id={msgKey} time={new Date()} />
    //             <Loading />
    //         </div>
    //     )
    // if (error) {
    //     return <div>{sendedMessage?.content + 'with error: ' + error.error}</div>
    // }

    // if (!loading && !error) onSended(msgKey)

    return <></>
}

export default MessageFromClient
