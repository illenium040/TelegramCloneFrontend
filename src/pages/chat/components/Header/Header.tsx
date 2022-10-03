import { BsSearch } from "@react-icons/all-files/bs/BsSearch"
import { BsReverseLayoutSidebarReverse } from "@react-icons/all-files/bs/BsReverseLayoutSidebarReverse"
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical"
import "./chat-header.css"
import { UserDTO } from "common/models/user-models"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
export const Header = (props: { user: UserDTO }) => {
    const curUser = useAuthContext()
    const { user } = props
    return (
        <div className="chat-header border-gray text-header-bold dark:border-dark">
            <div className="flex flex-col w-full">
                {user.id === curUser.id ? (
                    <span>Избранное</span>
                ) : (
                    <>
                        <span>{user.name}</span>
                        <span className="text-default-gray">{"Был(а) недавно"}</span>
                    </>
                )}
            </div>
            <div className="self-end flex flex-row items-center">
                <BsSearch className="chat-header-icon " />
                <BsReverseLayoutSidebarReverse className="chat-header-icon" />
                <BsThreeDotsVertical className="chat-header-icon m-0" />
            </div>
        </div>
    )
}
