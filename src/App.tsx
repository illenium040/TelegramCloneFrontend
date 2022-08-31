import React from 'react';
import Sidebar from './components/sidebar';
import ChatFacade from './components/chat-facade';
import { UserService } from './services/user-service';
import { UserDTO } from './models/user-models';

class App extends React.Component<{}, { user: UserDTO | undefined }> {

  private _userService = new UserService();

  constructor(props: any) {
    super(props);
    this.state = { user: undefined }
  }

  componentDidMount() {
    this.getUserDBG();
  }

  private getUserDBG() {
    if (window.location.port === '3000') {
      return this._userService.getUserByIndex(0)
        .then(x => this.setState({ user: x }));
    }
    else {
      return this._userService.getUserByIndex(1)
        .then(x => this.setState({ user: x }));
    }
  }

  public render() {
    if (this.state.user === undefined) return <div>loading...</div>
    return (
      <div className="app">
        <div className='sidebar-container '>
          <Sidebar />
          <ChatFacade user={this.state.user} />
        </div>
      </div>
    );
  }

}

export default App;
