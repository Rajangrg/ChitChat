import React from 'react';

//3rd parties dependencies
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from './config'
//components
import MessageList from './components/message-list/message-list.component'

import './App.css';

class App extends React.Component {
  //api setup
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'pusher-quick-start-bob',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        //console.log('Successful connection', currentUser)
        currentUser.subscribeToRoom({
          roomId: 'alice_and_bob',
          hooks: {
            onMessage: message => {
              console.log("received message", message.text)
            }
          }
          })
      })

  }

  render() {
    return (
      <div className="app">
        <MessageList></MessageList>
      </div>
    )
  }
}

export default App;
