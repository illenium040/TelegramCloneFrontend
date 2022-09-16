import ReactDOM from "react-dom/client"
import App from "./pages/App"
import { Provider } from "react-redux"
import { store } from "./api"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Auth } from "pages/Auth/Auth"
import Login from "pages/Auth/Login"
import { Register } from "pages/Auth/Register"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />}>
                    <Route path="/" element={<App />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </Provider>
)
