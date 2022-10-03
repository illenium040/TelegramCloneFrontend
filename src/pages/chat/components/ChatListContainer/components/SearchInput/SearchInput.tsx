import { Loader } from "pages/Loaders"

export const SearchInput = (props: {
    searchRefInput: React.LegacyRef<HTMLInputElement>
    handleSearchInput: () => void
    isLoading: boolean
}) => {
    const { searchRefInput, handleSearchInput, isLoading } = props
    return (
        <div className="chat-list-search">
            <input
                ref={searchRefInput}
                onChange={handleSearchInput}
                className="dark:bg-dark-sidebar-bg-lighter"
                placeholder="Поиск..."
                type="text"
            />
            {isLoading && <Loader className="w-[32px] ml-1" loaderWidth={24} thickness={2} />}
        </div>
    )
}
