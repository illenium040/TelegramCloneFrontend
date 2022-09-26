import { Sidebar } from "pages/Sidebar"
import { ChatContainer } from "../chat"
import "./App.css"
import "./scrollbar.css"

export const App = () => {
    return (
        <div className="app">
            <div className="sidebar-container">
                <Sidebar />
                <ChatContainer />
            </div>
        </div>
    )
}
