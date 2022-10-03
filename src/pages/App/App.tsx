import { useConnectQuery } from "api/signalR"
import { useAuthContext } from "pages/Auth/hooks/useAuth"
import { FullPageLoader } from "pages/Loaders/Loader"
import { Sidebar } from "pages/Sidebar"
import { ChatContainer } from "../chat"
import "./App.css"
import "./scrollbar.css"

export const App = () => {
    const user = useAuthContext()
    const { isLoading } = useConnectQuery(user.id)

    if (isLoading) return <FullPageLoader loaderWidth={64} />

    return (
        <div className="app">
            <div className="sidebar-container">
                <Sidebar />
                <ChatContainer />
            </div>
        </div>
    )
}
