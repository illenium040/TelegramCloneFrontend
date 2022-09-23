import { UserDTO } from "common/models/user-models"

export type ChatSearchProps = {
    handleSearchInput: (value: string) => void
    handleSearchData: (users: UserDTO[]) => void
}
