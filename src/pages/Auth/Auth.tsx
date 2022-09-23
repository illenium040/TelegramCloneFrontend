import { useIsValidMutation } from "api/user"
import { UserDTO } from "common/models/user-models"
import { FullPageLoader } from "pages/Loaders/Loader"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "./hooks/useAuth"

export const Auth = () => {
    const user = localStorage.getItem("user")
    const [isValid, validState] = useIsValidMutation()
    const succeeded = validState.data?.succeeded

    if (validState.isUninitialized) {
        isValid()
        return <FullPageLoader loaderWidth={128} />
    }

    if (validState.isLoading) return <FullPageLoader loaderWidth={128} />

    if (user && succeeded)
        return (
            <AuthContext.Provider value={JSON.parse(user) as UserDTO}>
                <Outlet />
            </AuthContext.Provider>
        )

    return <Navigate to="/login" />
}
