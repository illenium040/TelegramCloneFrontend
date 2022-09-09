import anime from "animejs"
import { useEffect, useRef } from "react"
import $ from "jquery"
export const useAnimations = () => {
    const chatListRef = useRef<HTMLElement>(null)
    const isVisible = useRef(true)
    let chatClick = useRef<() => void>(() => {})
    const disappear = () => {
        anime({
            targets: chatListRef.current,
            translateX: "-1000px",
            easing: "easeInSine",
            duration: 500
        })
        isVisible.current = false
    }
    const appear = () => {
        anime({
            targets: chatListRef.current,
            translateX: {
                value: "0px",
                duration: 500
            },
            easing: "easeInSine"
        })
        isVisible.current = true
    }
    useEffect(() => {
        const query = window.matchMedia("screen and (max-width: 800px)")
        $("#all-chats").on("click", appear)
        if (query.matches) {
            chatClick.current = disappear
        }
        query.addEventListener("change", e => {
            if (e.matches) {
                chatClick.current = disappear
            } else {
                chatClick.current = () => {}
                if (!isVisible.current) {
                    $(chatListRef.current!).css("transform", "translateX(0px)")
                    isVisible.current = true
                }
            }
        })
    }, [])

    return { chatListRef, chatClick }
}
