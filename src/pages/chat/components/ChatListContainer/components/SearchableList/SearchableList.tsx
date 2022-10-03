import { createEmptyChatView } from "common/extensions/dto-extensions"
import { UserDTO } from "common/models/user-models"
import { ChatView } from "pages/chat/types"
import { ChatViewComponent } from "../ChatViewComponent"
import { ChatViewType } from "../ChatViewComponent/types"

export const SearchableChatList = (props: {
    existedViews: ChatView[]
    extendViews: UserDTO[]
    handleClick: (view: ChatView) => void
}) => {
    const { existedViews, extendViews, handleClick } = props
    return (
        <>
            {existedViews!.map((x, i) => (
                <ChatViewComponent chatType={ChatViewType.My} key={x.chatId} handleClick={handleClick} unit={x} />
            ))}
            {extendViews.length > 0 && <div className="border-t-2 border-black"></div>}
            {extendViews!.map((x, i) => (
                <ChatViewComponent
                    chatType={ChatViewType.OnSearch}
                    key={x.id}
                    handleClick={handleClick}
                    unit={createEmptyChatView(x, `search_${i}`)}
                />
            ))}
        </>
    )
}
