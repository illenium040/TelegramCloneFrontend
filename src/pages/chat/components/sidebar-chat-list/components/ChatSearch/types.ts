import { UserDTO } from "common/models/user-models"

export type ChatSearchProps = {
    handleSearchData: (users: UserDTO[]) => void
}
