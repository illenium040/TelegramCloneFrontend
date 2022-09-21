import "./ContextMenu.css"
import { useEffect, useRef } from "react"
import useContextMenu from "./hooks/useContextMenu"
import anime from "animejs"
import { BiArchiveIn } from "@react-icons/all-files/bi/BiArchiveIn"
import { AiOutlinePushpin } from "@react-icons/all-files/ai/AiOutlinePushpin"
import { IoMdVolumeOff } from "@react-icons/all-files/io/IoMdVolumeOff"
import { FiMessageCircle } from "@react-icons/all-files/fi/FiMessageCircle"
import { BsFillFolderSymlinkFill } from "@react-icons/all-files/bs/BsFillFolderSymlinkFill"
import { IoHandRight } from "@react-icons/all-files/io5/IoHandRight"
import { GiBroom } from "@react-icons/all-files/gi/GiBroom"
import { FiTrash } from "@react-icons/all-files/fi/FiTrash"

type ContextChatListMenuProps = {
    onDelete: (element: HTMLElement) => void
}

export const ContextChatListMenu = (props: ContextChatListMenuProps) => {
    const { onDelete } = props
    const { anchorPoint, show, selected } = useContextMenu()
    const menuRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        anime({
            targets: menuRef.current?.firstChild,
            width: {
                value: "270px",
                duration: 100,
                easing: "easeInSine"
            },
            height: {
                value: "300px",
                duration: 100,
                easing: "easeInSine"
            }
        })
    }, [show])
    if (show) {
        return (
            <div ref={menuRef} className="menu-container">
                <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
                    <li>
                        <BiArchiveIn className="mr-5 w-[20px] h-[20px]" />
                        <p>Архивировать</p>
                    </li>
                    <li>
                        <AiOutlinePushpin className="mr-5 w-[20px] h-[20px]" />
                        <p>Открепить</p>
                    </li>
                    <li>
                        <IoMdVolumeOff className="mr-5 w-[20px] h-[20px]" />
                        <p>Выключить уведомления</p>
                    </li>
                    <li>
                        <FiMessageCircle className="mr-5 w-[20px] h-[20px]" />
                        <p>Пометить как непрочитанное</p>
                    </li>
                    <li>
                        <BsFillFolderSymlinkFill className="mr-5 w-[20px] h-[20px]" />
                        <p>Добавить в папку</p>
                    </li>
                    <li>
                        <IoHandRight className="mr-5 w-[20px] h-[20px]" />
                        <p>Заблокировать</p>
                    </li>
                    <li>
                        <GiBroom className="mr-5 w-[20px] h-[20px]" />
                        <p>Очистить историю</p>
                    </li>
                    <li onClick={() => onDelete(selected!)} className="text-red-500">
                        <FiTrash className="mr-5 w-[20px] h-[20px]" />
                        <p>Удалить</p>
                    </li>
                </ul>
            </div>
        )
    }
    return <></>
}
