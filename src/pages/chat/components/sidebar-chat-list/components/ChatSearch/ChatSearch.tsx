import { useEffect, useRef } from "react"
import { useSearch } from "../../hooks/useSearch"
import { ChatSearchProps } from "./types"

export const ChatSearch = (props: ChatSearchProps) => {
    const { handleSearchData } = props
    const { setName, search } = useSearch()
    const searchInput = useRef<HTMLInputElement>(null)
    const handleSearchInput = () => {
        setName(searchInput.current!.value)
    }

    useEffect(() => {
        if (search.isSuccess) {
            handleSearchData(searchInput.current?.value ? search?.data.data! : [])
        }
    }, [search.data?.data])

    return (
        <>
            <div className="chat-list-search">
                <input
                    ref={searchInput}
                    onChange={handleSearchInput}
                    className="dark:bg-dark-sidebar-bg-lighter"
                    placeholder="Поиск..."
                    type="text"
                />
            </div>
        </>
    )
}
