import { useEffect, useState } from 'react';
import { UserService } from './services/user-service';
import { UserDTO } from './models/user-models';
import { SignalRService } from './services/signalR-services';
import { Sidebar } from './components/sidebar';
import { ChatFacade } from './components/chat/chat-facade';
import { Loading } from './components/helpers/loading';
import { useActions } from './store/use-actions';
import { useTypedSelector } from './store/store';

const App = () => {
  const { fetchUser } = useActions();
  const { error, loading, user } = useTypedSelector(state => state.userReducer);

  useEffect(() => {
    fetchUser();
  }, [])

  if (error) return <p>{error}</p>
  if (loading) return <Loading />;

  return (
    <div className="app">
      <div className='sidebar-container'>
        <Sidebar />
        <ChatFacade user={user!} />
      </div>
    </div>
  )

}

export default App;
