import { getDateString } from "common/extensions/global-extensions"
import { UserDTO } from "common/models/user-models"
import { MessageDTO, MessageState } from "pages/chat/models/message"
import Loading from "pages/loading"

import { BsCheck } from "@react-icons/all-files/bs/BsCheck"
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll"

export type MessageProps = {
    message: MessageDTO
    userFrom: UserDTO
    userTo: UserDTO
}

const Message = (props: MessageProps) => {
    const { message, userFrom, userTo } = props
    const isMyMessage = message.userIdFrom === userFrom.id
    const me = isMyMessage ? userFrom : userTo
    return (
        <div className={`chat-message ${isMyMessage && "my-chat-message"}`}>
            <span className="chat-message-avatar">
                <img src={me.avatar} alt="" />
            </span>
            <div className="chat-message-text-container">
                <div className="txt">
                    <p>{message.content}</p>
                </div>
                <span className="text-default-gray ml-2 mt-2 self-end">{getDateString(message.created)}</span>
                {isMyMessage && message.state === MessageState.LOADING && <Loading className="w-[16px] h-[16px]" />}
                {isMyMessage && message.state === MessageState.SENDED_TO_SERVER && <BsCheck />}
                {isMyMessage && message.state === MessageState.SENDED_TO_USER && <BsCheckAll />}
                {isMyMessage && message.state === MessageState.READ && <BsCheckAll className="text-sky-500" />}
            </div>
        </div>
    )
}

export default Message
