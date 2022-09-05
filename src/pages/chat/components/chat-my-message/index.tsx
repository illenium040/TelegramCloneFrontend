import { getDateString } from 'common/extensions/global-extensions'
import { MessageProps } from '../chat-message'

const MyMessage = (props: MessageProps) => {
    const { avatar, content, id, time } = props
    return (
        <div key={id} className="chat-message my-chat-message">
            <span className="chat-message-avatar">
                <img src={avatar} alt="" />
            </span>
            <div className="chat-message-text-container">
                <p className="text-black">{content}</p>
                <span className="text-default-gray ml-2 mt-2 self-end">{getDateString(time)}</span>
            </div>
        </div>
    )
}

export default MyMessage
