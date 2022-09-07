import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll"
import { UserDTO } from "common/models/user-models"
import { getDateString } from "common/extensions/global-extensions"
import { ChatListUnit } from "../chat/models/chat"
import Loading from "../loading"
import { useGetChatListQuery } from "api/chat"

type SidebarChatListProps = {
    user: UserDTO
    onChatSelected: (chat: ChatListUnit) => void
}

const SidebarChatList = (props: SidebarChatListProps) => {
    const { onChatSelected, user } = props
    const { isError, error, isLoading, data } = useGetChatListQuery(user.id)

    return (
        <aside
            className="group 
            chat-sidebar-list chat-scrollbar shadow-lg shadow-black container-sm"
        >
            <div className="chat-list-search">
                <input placeholder="Поиск..." type="text" />
            </div>
            {isLoading && <Loading />}
            {data?.map((x, i) => (
                <div key={i} className="group chat-user" tabIndex={i} onClick={() => onChatSelected(x)}>
                    <span className="row-span-2">
                        <img className="chat-image" src={x.user.avatar} alt="" />
                    </span>
                    <span className="col-span-2 group-focus:text-white font-semibold text-lg">{x.user.name}</span>
                    {x.lastMessage && (
                        <div className="text-center text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-center">
                            <span className="flex justify-center items-center m-1 group-focus:text-white text-green-400">
                                <BsCheckAll />
                            </span>
                            <p>{getDateString(x.lastMessage?.created)}</p>
                        </div>
                    )}
                    {x.lastMessage && (
                        <span className="col-span-2 text-default-gray group-focus:text-white">
                            {x.lastMessage?.content}
                        </span>
                    )}
                    {x.unreadMessagesCount > 0 && (
                        <span className="flex justify-center items-center rounded-xl min-w-min text-white">
                            <p
                                className="
                    group-focus:text-white
                    group-focus:bg-side-indicator-focus 
                      text-center min-w-[40px] p-1 rounded-xl bg-sidebar-ico-focus"
                            >
                                {x.unreadMessagesCount}
                            </p>
                        </span>
                    )}
                </div>
            ))}
        </aside>
    )
}

export default SidebarChatList
