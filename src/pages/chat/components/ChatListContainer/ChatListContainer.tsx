import "./sidebar-chat-list.css"
import { useAnimations } from "./hooks/useAnimations"
import { ChatView } from "pages/chat/types"
import { ChatListContainerProps } from "./types"
import { useSearch } from "./hooks/useSearch"
import { SearchInput } from "./components/SearchInput"
import { SearchableChatList } from "./components/SearchableList"
import { ChatList } from "./components/ChatList"

export const ChatListContainer = (props: ChatListContainerProps) => {
    const { onChatSelected, views } = props
    const { chatClick, chatListRef } = useAnimations()
    const { search, searchRefInput, handleSearchInput, existedInSearch, extendInSearch, isSearch } = useSearch(views)

    const handleChatUserClick = (unit: ChatView) => {
        chatClick.current.call(undefined)
        onChatSelected(unit)
    }

    return (
        <aside
            ref={chatListRef}
            className="dark:bg-dark-chat-unit-bg dark:text-gray-200 group chat-sidebar-list chat-scrollbar shadow-lg shadow-black container-sm">
            <SearchInput
                handleSearchInput={handleSearchInput}
                searchRefInput={searchRefInput}
                isLoading={search.isFetching || search.isLoading}
            />
            {isSearch ? (
                <SearchableChatList
                    existedViews={existedInSearch}
                    extendViews={extendInSearch}
                    handleClick={handleChatUserClick}
                />
            ) : (
                <ChatList handleClick={handleChatUserClick} views={views} />
            )}
        </aside>
    )
}
