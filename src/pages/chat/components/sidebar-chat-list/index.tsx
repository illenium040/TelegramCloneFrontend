import "./sidebar-chat-list.css"
import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll"
import { getDateString } from "common/extensions/global-extensions"
import { ChatListUnit } from "../../models/chat"
import Loading from "../../../loading"
import { useGetChatListQuery } from "api/chat"
import { useAnimations } from "./hooks/useAnimations"
import { useAuthContext } from "pages/Auth/hooks/useAuth"

type SidebarChatListProps = {
    onChatSelected: (chat: ChatListUnit) => void
}

const SidebarChatList = (props: SidebarChatListProps) => {
    const user = useAuthContext()
    const { onChatSelected } = props
    const { isLoading, isFetching, data } = useGetChatListQuery(user.id)
    const { chatClick, chatListRef } = useAnimations()
    return (
        <aside
            ref={chatListRef}
            className="dark:bg-dark-chat-unit-bg
             dark:text-gray-200
             group chat-sidebar-list chat-scrollbar shadow-lg shadow-black container-sm"
            data->
            <div className="chat-list-search">
                <input className="dark:bg-dark-sidebar-bg-lighter" placeholder="Поиск..." type="text" />
            </div>
            {isFetching && <Loading />}
            {data &&
                data.data?.map((x, i) => (
                    <div
                        key={x.chatId}
                        className="group chat-user"
                        tabIndex={i}
                        onClick={e => {
                            chatClick.current.call(undefined)
                            onChatSelected(x)
                        }}>
                        <span className="row-span-2">
                            <img className="chat-image" src={x.user.avatar} alt="" />
                        </span>
                        <span className="col-span-2 group-focus:text-white font-semibold text-lg">{x.user.name}</span>
                        {x.lastMessage && (
                            <div className="text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-end">
                                <span className="flex justify-center items-center m-1 group-focus:text-white text-green-400">
                                    <BsCheckAll className="dark:text-sky-500" />
                                </span>
                                <p>{getDateString(x.lastMessage?.created)}</p>
                            </div>
                        )}
                        {x.lastMessage && (
                            <span className="w-[calc(100%+20px)] col-span-2 text-default-gray group-focus:text-white">
                                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                                    {x.lastMessage?.content}
                                </div>
                            </span>
                        )}
                        {x.unreadMessagesCount > 0 && (
                            <span className="flex justify-end items-center rounded-xl min-w-min text-white">
                                <p
                                    className="
                    group-focus:text-white mb-2 ml-5
                    group-focus:bg-side-indicator-focus 
                      text-center min-w-[40px] p-1 rounded-xl bg-sidebar-ico-focus">
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
