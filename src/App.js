import React from 'react';
import MessageList from './components/message-list/message-list.component'

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <MessageList></MessageList>
      </div>
    )
  }
}

export default App;
