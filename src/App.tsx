import { useEffect, useState } from 'react';
import { UserService } from './services/user-service';
import { UserDTO } from './models/user-models';
import { SignalRService } from './services/signalR-services';
import { Sidebar } from './components/sidebar';
import { ChatFacade } from './components/chat/chat-facade';

const App = () => {
  const [user, setUser] = useState<UserDTO | null>(null)
  const userService = new UserService();

  //use only on the first render
  useEffect(() => {
    getUserDBG();
  }, [])


  const getUser = (index: number) => {
    userService.getUserByIndex(index)
      .then(async (x) => {
        await SignalRService.getInstanceOf().init(x.id);
        setUser(x);
      });
  }

  const getUserDBG = () => {
    if (window.location.port === '3000') { getUser(0); }
    else { getUser(1); }
  }

  if (!user) return <p>loading...</p>

  return (
    <div className="app">
      <div className='sidebar-container'>
        <Sidebar />
        <ChatFacade user={user} />
      </div>
    </div>
  )

}

export default App;
