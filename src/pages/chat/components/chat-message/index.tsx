import { getDateString } from "common/extensions/global-extensions"
import { UserDTO } from "common/models/user-models"
import { MessageDTO } from "pages/chat/models/message"
import Loading from "pages/loading"

import { BsCheck } from "@react-icons/all-files/bs/BsCheck"
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll"

export enum MessageState {
    LOADING,
    SENDED_TO_SERVER,
    SENDED_TO_USER,
    READ,
    ERROR
}

export type MessageProps = {
    message: MessageDTO
    userTo: UserDTO
    userFrom: UserDTO
    state: MessageState
}

const Message = (props: MessageProps) => {
    const { userFrom, userTo, message, state } = props
    const isMyMessage = message.userIdFrom === userFrom.id
    const me = isMyMessage ? userFrom : userTo
    return (
        <div className={`chat-message ${isMyMessage && "my-chat-message"}`}>
            <span className="chat-message-avatar">
                <img src={me.avatar} alt="" />
            </span>
            <div className="chat-message-text-container">
                <p className="text-black">{message.content}</p>
                <span className="text-default-gray ml-2 mt-2 self-end">{getDateString(message.created)}</span>
                {isMyMessage && state === MessageState.LOADING && <Loading className="w-[16px] h-[16px]" />}
                {isMyMessage && state === MessageState.SENDED_TO_SERVER && <BsCheck />}
                {isMyMessage && state === MessageState.SENDED_TO_USER && <BsCheckAll />}
                {isMyMessage && state === MessageState.READ && <BsCheckAll className="text-sky-500" />}
            </div>
        </div>
    )
}

export default Message
