import { BiArchiveIn } from "@react-icons/all-files/bi/BiArchiveIn"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { useMessageCtxMenu } from "./hooks/useContextMenu"

export const MessageContextMenu = () => {
    const user = useAuthContext()
    const { anchorPoint, show, selectedMessage, menuRef } = useMessageCtxMenu()

    if (show) {
        return (
            <div ref={menuRef} className="menu-container" id="menu-container">
                <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
                    <li>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                    <li>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                    <li>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                    <li>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                    {selectedMessage && selectedMessage.userIdFrom === user.id && (
                        <li>
                            <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                            <p>Архивировать</p>
                        </li>
                    )}
                    <li>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                    <li>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                </ul>
            </div>
        )
    }
    return <></>
}
