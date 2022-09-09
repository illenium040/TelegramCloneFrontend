import { FiPaperclip } from "@react-icons/all-files/fi/FiPaperclip"
import { VscSmiley } from "@react-icons/all-files/vsc/VscSmiley"
import "./chat-footer.css"
type ChatFooterProps = {
    onMessageSubmit: (msg: string) => void
}

export const ChatFooter = (props: ChatFooterProps) => {
    const { onMessageSubmit } = props
    let message = ""
    const onEnterKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            ;(e.target as HTMLInputElement).value = ""
            onMessageSubmit(message)
        }
    }

    return (
        <div className="chat-footer border-gray">
            <FiPaperclip className="chat-footer-icon" />
            <input
                onKeyDown={onEnterKeyDown.bind(this)}
                onChange={e => (message = e.target.value)}
                className="chat-input"
                placeholder="Написать сообщение..."
                type="text"
            />
            <VscSmiley className="chat-footer-icon" />
        </div>
    )
}

export default ChatFooter
