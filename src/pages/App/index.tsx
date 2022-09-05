import { useEffect, useState } from 'react'
import { useActions, useTypedSelector } from 'common/store'
import { useInjection } from 'common/hooks/useInjection'
import ChatContainer from '../chat'
import Loading from '../loading'
import Sidebar from '../sidebar'
import './index.css'
import './scrollbar.css'

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
                <ChatContainer user={user!} />
            </div>
        </div>
    )
}

export default App
