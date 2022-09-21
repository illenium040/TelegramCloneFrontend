import { Sidebar } from "pages/Sidebar"
import ChatContainer from "../chat"
import "./index.css"
import "./scrollbar.css"

const App = () => {
    return (
        <div className="app">
            <div className="sidebar-container">
                <Sidebar />
                <ChatContainer />
            </div>
        </div>
    )
}

export default App
