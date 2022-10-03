import { ChatView } from "pages/chat/types"
import { usePin } from "../../hooks/usePin"
import { ChatViewComponent } from "../ChatViewComponent"
import { ChatViewType } from "../ChatViewComponent/types"

export const ChatList = (props: { handleClick: (view: ChatView) => void; views: ChatView[] }) => {
    const { handleClick, views } = props
    const { pinnedViews } = usePin(views)
    return (
        <>
            {pinnedViews.map((x, i) => (
                <ChatViewComponent chatType={ChatViewType.My} key={x.chatId} handleClick={handleClick} unit={x} />
            ))}
        </>
    )
}
