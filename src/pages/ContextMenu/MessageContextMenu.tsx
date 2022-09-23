import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { useMessageCtxMenu } from "./hooks/useContextMenu"
import { BsArrowReturnLeft } from "@react-icons/all-files/bs/BsArrowReturnLeft"
import { BsArrowReturnRight } from "@react-icons/all-files/bs/BsArrowReturnRight"
import { RiEdit2Line } from "@react-icons/all-files/ri/RiEdit2Line"
import { AiOutlinePushpin } from "@react-icons/all-files/ai/AiOutlinePushpin"
import { MdContentCopy } from "@react-icons/all-files/md/MdContentCopy"
import { FiTrash } from "@react-icons/all-files/fi/FiTrash"
import { IoIosCheckmarkCircleOutline } from "@react-icons/all-files/io/IoIosCheckmarkCircleOutline"
export const MessageContextMenu = () => {
    const user = useAuthContext()
    const { anchorPoint, show, selectedMessage, menuRef } = useMessageCtxMenu()

    if (show) {
        return (
            <div ref={menuRef} className="menu-container" id="menu-container">
                <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
                    <li>
                        <BsArrowReturnLeft className="flipV mr-5 w-[20px] h-[20px]" />
                        <p>Ответить</p>
                    </li>
                    {selectedMessage && selectedMessage.userIdFrom === user.id && (
                        <li>
                            <RiEdit2Line className="mr-5 w-[20px] h-[20px]" />
                            <p>Изменить</p>
                        </li>
                    )}
                    <li>
                        <AiOutlinePushpin className="mr-5 w-[20px] h-[20px]" />
                        <p>Закрепить</p>
                    </li>
                    <li>
                        <MdContentCopy className="mr-5 w-[20px] h-[20px]" />
                        <p>Копировать</p>
                    </li>

                    <li>
                        <BsArrowReturnRight className="flipV mr-5 w-[20px] h-[20px]" />
                        <p>Переслать</p>
                    </li>

                    <li>
                        <FiTrash className="mr-5 w-[20px] h-[20px]" />
                        <p>Удалить</p>
                    </li>
                    <li>
                        <IoIosCheckmarkCircleOutline className="mr-5 w-[20px] h-[20px]" />
                        <p>Выделить</p>
                    </li>
                </ul>
            </div>
        )
    }
    return <></>
}
