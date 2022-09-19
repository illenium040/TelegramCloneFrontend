import { UserDTO } from "common/models/user-models"
import { createContext, useContext } from "react"

export const AuthContext = createContext<UserDTO>({
    avatar: "",
    email: "",
    id: "",
    name: "",
    loginName: ""
})

export const useAuthContext = () => {
    return useContext(AuthContext)
}
