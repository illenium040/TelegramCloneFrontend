import "./chat-message.css"
import { getDateString } from "common/extensions/global-extensions"
import { UserDTO } from "common/models/user-models"
import { Loader } from "pages/Loaders"
import { BsCheck } from "@react-icons/all-files/bs/BsCheck"
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll"
import { MessageDTO, MessageState } from "pages/chat/types"
export type MessageProps = {
    message: MessageDTO
    userFrom: UserDTO
    userTo: UserDTO
}

export const Message = (props: MessageProps) => {
    const { message, userFrom, userTo } = props
    const isMyMessage = message.userIdFrom === userFrom.id
    const me = isMyMessage ? userFrom : userTo
    return (
        <div id={message.id} className={`chat-message ${isMyMessage && "my-chat-message"}`}>
            <span className="chat-message-avatar">
                <img src={me.avatar ?? "/images/default-avatar.png"} alt="" />
            </span>
            <div className="chat-message-text-container">
                <div className="txt">
                    <p>{message.content}</p>
                </div>
                <span className="text-default-gray ml-2 mt-2 self-end">{getDateString(message.created)}</span>
                {isMyMessage && message.state === MessageState.LOADING && (
                    <Loader loaderWidth={10} thickness={1} className="w-[16px] h-[16px] ml-2" />
                )}
                {isMyMessage && message.state === MessageState.SENDED_TO_USER && <BsCheck className="text-sky-500" />}
                {isMyMessage && message.state === MessageState.READ && <BsCheckAll className="text-sky-500" />}
            </div>
        </div>
    )
}
