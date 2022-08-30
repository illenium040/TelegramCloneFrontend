import React from 'react';
import Sidebar from './components/sidebar';
import ChatFacade from './components/chat-facade';

function App() {
  return (
    <div className="app">
      <div className='sidebar-container '>
        <Sidebar />
        <ChatFacade />
      </div>
    </div>
  );
}

export default App;
