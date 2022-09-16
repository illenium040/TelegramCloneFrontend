import { UserDTO } from "common/models/user-models"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "./hooks/useAuth"

export const Auth = () => {
    const user = localStorage.getItem("user")
    return user ? (
        <AuthContext.Provider value={JSON.parse(user) as UserDTO}>
            <Outlet />
        </AuthContext.Provider>
    ) : (
        <Navigate to="/login" />
    )
}
