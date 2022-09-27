import { BsCheckAll } from "@react-icons/all-files/bs/BsCheckAll"
import { getDateString } from "common/extensions/global-extensions"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { Loader } from "pages/Loaders"
import { ChatViewProps } from "./types"

export const ChatViewComponent = (props: ChatViewProps) => {
    const { unit, handleClick, chatType } = props
    const user = useAuthContext()
    if (unit.user.id === user.id)
        return (
            <div id={unit.chatId} className={`group chat-user ${chatType}`} onClick={() => handleClick(unit)}>
                {unit.loading && (
                    <div className="chat-view-loading">
                        <Loader />
                    </div>
                )}
                <span className="row-span-2">
                    <img className="chat-image" src={"/images/favorites.png"} alt="" />
                </span>
                <span className="col-span-2 group-focus:text-white font-semibold text-lg">{"Избранное"}</span>
                {unit.lastMessage && (
                    <div className="text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-end">
                        <span className="flex justify-center items-center m-1 group-focus:text-white text-green-400">
                            <BsCheckAll className="dark:text-sky-500" />
                        </span>
                        <p>{getDateString(unit.lastMessage?.created)}</p>
                    </div>
                )}
                {unit.lastMessage && (
                    <span className="w-[calc(100%+20px)] col-span-2 text-default-gray group-focus:text-white">
                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {unit.lastMessage?.content}
                        </div>
                    </span>
                )}
            </div>
        )

    return (
        <div id={unit.chatId} className={`group chat-user ${chatType}`} onClick={() => handleClick(unit)}>
            {unit.loading && (
                <div className="chat-view-loading">
                    <Loader />
                </div>
            )}
            <span className="row-span-2">
                <img className="chat-image" src={unit.user.avatar ?? "/images/default-avatar.png"} alt="" />
            </span>
            <span className="col-span-2 group-focus:text-white font-semibold text-lg">{unit.user.name}</span>
            {unit.lastMessage && (
                <div className="text-side-gray flex flex-row group-focus:text-white text-sm items-center justify-end">
                    <span className="flex justify-center items-center m-1 group-focus:text-white text-green-400">
                        <BsCheckAll className="dark:text-sky-500" />
                    </span>
                    <p>{getDateString(unit.lastMessage?.created)}</p>
                </div>
            )}
            {unit.lastMessage && (
                <span className="w-[calc(100%+20px)] col-span-2 text-default-gray group-focus:text-white">
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap">{unit.lastMessage?.content}</div>
                </span>
            )}
            {unit.unreadMessagesCount > 0 && (
                <span className="flex justify-end items-center rounded-xl min-w-min text-white">
                    <p className=" group-focus:text-white mb-2 ml-5 group-focus:bg-side-indicator-focus text-center min-w-[40px] p-1 rounded-xl bg-sidebar-ico-focus">
                        {unit.unreadMessagesCount}
                    </p>
                </span>
            )}
            {unit.chatToUser.isArchived && <span>ARCHIVED</span>}
        </div>
    )
}
