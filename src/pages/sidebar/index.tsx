import { BsFillChatFill } from '@react-icons/all-files/bs/BsFillChatFill'
import { BsJustify } from '@react-icons/all-files/bs/BsJustify'
import { BsFolder } from '@react-icons/all-files/bs/BsFolder'
import { BsGear } from '@react-icons/all-files/bs/BsGear'

type SidebarIcon = {
    icon: JSX.Element
    anchoredText?: string
}

const Sidebar = () => {
    const icons: SidebarIcon[] = [
        { icon: <BsJustify className="sidebar-ico" /> },
        { icon: <BsFillChatFill className="sidebar-ico" />, anchoredText: 'Все чаты' },
        { icon: <BsFolder className="sidebar-ico" />, anchoredText: 'Личные' },
        { icon: <BsGear className="sidebar-ico" />, anchoredText: 'Ред.' }
    ]

    return (
        <aside className="min-w-[80px] h-screen bg-sidebar" aria-label="Sidebar">
            <div className="overflow-y-auto dark:bg-gray-800">
                <ul className="space-y-2">
                    {icons.map((x, i) => (
                        <li key={i}>
                            <a href="#" className="group sidebar-ref">
                                {x.icon}
                                <span>{x.anchoredText}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
