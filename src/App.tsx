import { useEffect, useState } from 'react'
import { Sidebar } from './components/sidebar'
import { ChatFacade } from './components/chat/chat-facade'
import { Loading } from './components/helpers/loading'
import { useActions } from './store/use-actions'
import { useTypedSelector } from './store/store'
import { useInjection } from './hooks/useInjection'

const App = () => {
    const { fetchUser } = useActions()
    const { error, loading, user } = useTypedSelector(state => state.userReducer)
    const { signalRService, userService } = useInjection()
    //connect signalRService
    const [isSRConnected, setConnectionState] = useState(false)
    useEffect(() => {
        fetchUser(userService)
    }, [])
    //
    if (error) return <p>{error}</p>
    if (loading) return <Loading />
    if (!user) return <Loading />

    if (!isSRConnected) {
        signalRService.startSignalRConnection(user?.id, '/hubs/notifications').then(() => {
            setConnectionState(signalRService.isConnected)
        })
        return <Loading />
    }

    return (
        <div className="app">
            <div className="sidebar-container">
                <Sidebar />
                <ChatFacade user={user!} />
            </div>
        </div>
    )
}

export default App
