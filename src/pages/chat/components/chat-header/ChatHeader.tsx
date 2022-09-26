import { BsSearch } from "@react-icons/all-files/bs/BsSearch"
import { BsReverseLayoutSidebarReverse } from "@react-icons/all-files/bs/BsReverseLayoutSidebarReverse"
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical"
import "./chat-header.css"
export const ChatHeader = (props: { userName: string }) => {
    return (
        <div className="chat-header border-gray text-header-bold dark:border-dark">
            <div className="flex flex-col w-full">
                <span>{props.userName}</span>
                <span className="text-default-gray">{"Был(а) недавно"}</span>
            </div>
            <div className="self-end flex flex-row items-center">
                <BsSearch className="chat-header-icon " />
                <BsReverseLayoutSidebarReverse className="chat-header-icon" />
                <BsThreeDotsVertical className="chat-header-icon m-0" />
            </div>
        </div>
    )
}
