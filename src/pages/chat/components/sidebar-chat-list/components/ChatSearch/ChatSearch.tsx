import "./ChatSearch.css"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { Loading } from "pages/Loading"
import { useEffect, useRef } from "react"
import { useSearch } from "../../hooks/useSearch"
import { ChatSearchProps } from "./types"

export const ChatSearch = (props: ChatSearchProps) => {
    const { handleSearchData, handleSearchInput } = props
    const { setName, search } = useSearch()
    const searchInput = useRef<HTMLInputElement>(null)
    const handleInput = () => {
        handleSearchInput(searchInput.current!.value)
        setName(searchInput.current!.value)
    }

    useEffect(() => {
        if (search.isSuccess) {
            handleSearchData(searchInput.current?.value ? search?.data.data!.map(x => x) : [])
        }
    }, [search.data])

    return (
        <div className="chat-list-search">
            <input
                ref={searchInput}
                onChange={handleInput}
                className="dark:bg-dark-sidebar-bg-lighter"
                placeholder="Поиск..."
                type="text"
            />
            {search.isFetching && <Loading className="w-[32px] h-[32px] ml-1" />}
        </div>
    )
}
