import "./settings.css"
import { useContext, useEffect } from "react"
import { FiMoon } from "@react-icons/all-files/fi/FiMoon"
import { useAuthContext } from "pages/Auth/hooks/useAuth"

export const SidebarSettings = (props: { hide: () => void }) => {
    const { hide } = props
    const user = useAuthContext()

    const onDarkMode = () => {
        if (localStorage.getItem("color-theme")) {
            if (localStorage.getItem("color-theme") === "light") {
                document.documentElement.classList.add("dark")
                localStorage.setItem("color-theme", "dark")
            } else {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("color-theme", "light")
            }
        } else {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("color-theme", "light")
            } else {
                document.documentElement.classList.add("dark")
                localStorage.setItem("color-theme", "dark")
            }
        }
    }

    useEffect(() => {
        const x = localStorage.getItem("color-theme")
        if (x && x === "dark") {
            document.documentElement.classList.add(x)
        }
    })

    return (
        <>
            <div id="sidebar-settings" className="all-shadow hidden" onClick={e => hide()}></div>
            <div
                onClick={e => e.stopPropagation()}
                className="hidden sidebar-settings flex-col dark:bg-sidebar-focus dark:text-gray-200">
                <div className="w-full border-gray-200 border-b-[1px] p-0">
                    <div className="p-5">
                        <div className="w-[70px] h-[70px]">
                            <img className="rounded-full" src={user.avatar ?? "/images/default-avatar.png"} alt="" />
                        </div>
                        <div className="font-semibold pt-2">
                            <span>{user.name}</span>
                        </div>
                    </div>
                </div>
                <div className="h-full flex p-5">
                    <div className="h-[50px] w-full flex items-center">
                        <div className="inline-flex w-full">
                            <span className="mr-5 w-[30px] h-[30px] bg-indigo-300 rounded-lg flex items-center justify-center">
                                <FiMoon className="text-white w-[20px] h-[20px] m-0" />
                            </span>
                            <span className="text-start font-semibold flex items-center">
                                <p className="w-[150px]">Ночной режим</p>
                            </span>
                            <label
                                htmlFor="darkmode-toggle"
                                className="inline-flex relative items-center cursor-pointer self-center">
                                <input
                                    onClick={e => onDarkMode()}
                                    type="checkbox"
                                    id="darkmode-toggle"
                                    className="sr-only peer outline-none"
                                    defaultChecked={localStorage.getItem("color-theme") === "dark" ? true : false}
                                />
                                <div
                                    className="w-11 h-4 bg-gray-200 outline-none  rounded-full peer
                                  dark:bg-gray-700 peer-checked:after:translate-x-full
                                   peer-checked:after:border-white after:content-['']
                                    after:absolute after:top-[-3px] after:left-[-4px]
                                     after:bg-white after:border-gray-300
                                      after:border after:rounded-full after:h-6 after:w-6 after:transition-all
                                       dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="p-5 justify-items-end">
                    <span className="text-side-gray font-semibold">TG Clone</span>
                    <br />
                    <span className="text-side-gray">Версия 0.0.1</span>
                </div>
            </div>
        </>
    )
}
