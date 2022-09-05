import ChatContainer from '../chat'
import Loading from '../loading'
import Sidebar from '../sidebar'
import './index.css'
import './scrollbar.css'
import { useGetUserByNameQuery } from 'api/user'

const getUserNameDBG = () => {
    if (window.location.port === '3000') {
        return 'Виталий'
    } else if (window.location.port === '3001') {
        return 'Давыда'
    } else {
        return 'Олег'
    }
}

const App = () => {
    const getUserQuery = useGetUserByNameQuery(getUserNameDBG())
    // const { signalRService } = useInjection()
    // const [isSRConnected, setConnectionState] = useState(false)

    if (getUserQuery.isError) return <p>{(getUserQuery.error as Error).message}</p>
    if (getUserQuery.isLoading) return <Loading />
    if (!getUserQuery) return <Loading />

    // if (!isSRConnected) {
    //     signalRService.startSignalRConnection(getUserQuery.data?.id!, '/hubs/notifications').then(() => {
    //         setConnectionState(signalRService.isConnected)
    //     })
    //     return <Loading />
    // }
    return (
        <div className="app">
            <div className="sidebar-container">
                <Sidebar />
                <ChatContainer user={getUserQuery.data!} />
            </div>
        </div>
    )
}

export default App
