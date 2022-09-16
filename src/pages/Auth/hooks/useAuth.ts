import { UserDTO } from "common/models/user-models"
import { createContext, useContext, useState } from "react"

export const AuthContext = createContext<UserDTO>({
    avatar: "",
    email: "",
    id: "",
    name: ""
})

export const useAuthContext = () => {
    return useContext(AuthContext)
}
