import ChatContainer from "../chat"
import Loading from "../loading"
import Sidebar from "../sidebar"
import "./index.css"
import "./scrollbar.css"
import { useGetUserByNameQuery } from "api/user"
import { createContext } from "react"
import { UserDTO } from "common/models/user-models"

const getUserNameDBG = () => {
    if (window.location.port === "3000") {
        return "Виталий"
    } else if (window.location.port === "3001") {
        return "Давыда"
    } else {
        return "Олег"
    }
}

export const AppContext = createContext<UserDTO>({
    avatar: "",
    email: "",
    id: "",
    name: ""
})

const App = () => {
    const getUserQuery = useGetUserByNameQuery(getUserNameDBG())
    if (getUserQuery.isError) return <p>{(getUserQuery.error as Error).message}</p>
    if (getUserQuery.isLoading) return <Loading />
    if (!getUserQuery) return <Loading />
    return (
        <AppContext.Provider value={getUserQuery.data!}>
            <div className="app">
                <div className="sidebar-container">
                    <Sidebar />
                    <ChatContainer />
                </div>
            </div>
        </AppContext.Provider>
    )
}

export default App
