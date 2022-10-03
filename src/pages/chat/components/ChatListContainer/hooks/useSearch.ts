import { useSearchQuery } from "api/user"
import { UserDTO } from "common/models/user-models"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { ChatView } from "pages/chat/types"
import { useRef, useState, useEffect, useMemo } from "react"

export const useSearch = (views: ChatView[]) => {
    const user = useAuthContext()
    const [name, setName] = useState<string>("")
    const search = useSearchQuery(name)
    const searchRefInput = useRef<HTMLInputElement>(null)
    const onSearchViews = useMemo(() => views.filter(x => x.user.id !== user.id), [views])
    const [extendInSearch, setExtendChats] = useState<UserDTO[]>([])
    const [existedInSearch, setExistedChats] = useState<ChatView[]>([])

    useEffect(() => {
        if (search.isSuccess) {
            handleSearchData(searchRefInput.current?.value ? search?.data.data!.map(x => x) : [])
        }
    }, [search.data])

    const handleSearchData = (users: UserDTO[]) => {
        if (users.length <= 0) return
        const filtered = users.filter(user => onSearchViews.findIndex(view => view.user.id === user.id) === -1)
        const myIndex = filtered.findIndex(x => x.id === user.id)
        if (myIndex !== -1) filtered.splice(myIndex, 1)
        setExtendChats(filtered)
    }

    const handleSearchInput = () => {
        if (!searchRefInput.current!.value) {
            setExistedChats([])
            setExtendChats([])
            return
        }
        const values = onSearchViews.filter(
            view =>
                view.user.name.toLowerCase().indexOf(searchRefInput.current!.value.toLocaleLowerCase()) >= 0 &&
                !view.chatId.startsWith("search")
        )
        setExistedChats(values)
        setName(searchRefInput.current!.value)
    }
    const isSearch = (searchRefInput.current && searchRefInput.current!.value) ?? null
    return { search, searchRefInput, handleSearchInput, extendInSearch, existedInSearch, isSearch }
}
