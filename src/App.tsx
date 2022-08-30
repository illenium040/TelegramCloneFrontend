import React from 'react';
import Sidebar from './components/sidebar';
import ChatFacade from './components/chat-facade';
import { UserService } from './services/user-service';

function App() {
  return (
    <div className="app">
      <div className='sidebar-container '>
        <Sidebar />
        <ChatFacade user={UserService.getDebugUser()} />
      </div>
    </div>
  );
}

export default App;
