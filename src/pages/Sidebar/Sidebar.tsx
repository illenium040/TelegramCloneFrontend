import "./Sidebar.css"
import { BsFillChatFill } from "@react-icons/all-files/bs/BsFillChatFill"
import { BsJustify } from "@react-icons/all-files/bs/BsJustify"
import { BsFolder } from "@react-icons/all-files/bs/BsFolder"
import { BsGear } from "@react-icons/all-files/bs/BsGear"
import { SidebarSettings } from "./components/SidebarSettings"
import React from "react"
import anime from "animejs"
import $ from "jquery"

type SidebarIcon = {
    icon: JSX.Element
    anchoredText?: string
    click?: () => void
}

export const Sidebar = () => {
    const toggleSettingsVision = (isVisible: boolean) => {
        const main = document.querySelector(".sidebar-settings")
        const shadowContainer = document.querySelector("#sidebar-settings")
        anime({
            targets: main,
            translateX: {
                value: isVisible ? 0 : -500,
                easing: "easeInSine",
                duration: 200
            },
            begin(anim) {
                if (isVisible) $(main!).css("display", "flex")
            },
            complete(anim) {
                if (!isVisible) $(main!).css("display", "none")
            }
        })
        anime({
            targets: shadowContainer,
            opacity: {
                value: isVisible ? 1 : 0,
                duration: 200,
                easing: "easeInSine"
            },
            begin(anim) {
                if (isVisible) $(shadowContainer!).css("display", "block")
            },
            complete(anime) {
                if (!isVisible) $(shadowContainer!).css("display", "none")
            }
        })
    }

    const icons: SidebarIcon[] = [
        { icon: <BsJustify className="sidebar-ico" />, click: () => toggleSettingsVision(true) },
        { icon: <BsFillChatFill className="sidebar-ico" />, anchoredText: "Все чаты" },
        { icon: <BsFolder className="sidebar-ico" />, anchoredText: "Личные" },
        { icon: <BsGear className="sidebar-ico" />, anchoredText: "Ред." }
    ]
    const ids = ["settings", "all-chats", "private", "edit"]
    return (
        <React.Fragment>
            <aside className="z-40 dark:bg-dark-sidebar-bg  min-w-[80px] h-screen bg-sidebar" aria-label="Sidebar">
                <div className="overflow-y-auto ">
                    <ul>
                        {icons.map((x, i) => (
                            <li key={i}>
                                <a onClick={x.click} tabIndex={i} id={ids[i]} className="group sidebar-ref">
                                    {x.icon}
                                    <span>{x.anchoredText}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <SidebarSettings hide={() => toggleSettingsVision(false)} />
        </React.Fragment>
    )
}
