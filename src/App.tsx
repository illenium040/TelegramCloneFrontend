import React from 'react';
import Sidebar from './components/sidebar';
import ChatFacade from './components/chat-facade';
import { UserService } from './services/user-service';
import { UserDTO } from './models/user-models';
import { SignalRService } from './services/signalR-services';

class App extends React.Component<{}, { user: UserDTO }> {

  private _userService = new UserService();

  constructor(props: any) {
    super(props);
  }


  componentDidMount() {
    console.log(this);
    this.getUserDBG();
  }

  private getUser(index: number) {
    this._userService.getUserByIndex(index)
      .then(async (x) => {
        await SignalRService.getInstanceOf().init(x.id);
        this.setState({ user: x });
      });
  }

  private getUserDBG() {
    if (window.location.port === '3000') { this.getUser(0); }
    else { this.getUser(1); }
  }

  public render() {
    if (!this.state) return <p>loading...</p>
    return (
      <div className="app">
        <div className='sidebar-container'>
          <Sidebar />
          <ChatFacade user={this.state.user} />
        </div>
      </div>
    );
  }

}

export default App;
