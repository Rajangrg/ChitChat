import React from 'react';
//3rd parties dependencies
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from './config'
//components
import MessageList from './components/message-list/message-list.component'
import SendmessageForm from './components/sendmessage-form/sendmessage-form.component'
import RoomList from './components/room-list/room-list.component'
//style
import './App.css';

class App extends React.Component {

  constructor() {
    super(); //calling the super on the react.component class
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  //api setup
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'pusher-quick-start-bob',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    })

    //if connection is true
    chatManager.connect()
      .then(currentUser => {
        //console.log('Successful connection', currentUser)

        this.currentUser = currentUser // for further access

        this.currentUser.getJoinableRooms()
          .then(joinableRooms => {
            this.setState({
              joinableRooms, //available room
              joinedRooms: this.currentUser.rooms //joined
            })
          }).catch(err => console.log('error on joinable room:', err))

        this.currentUser.subscribeToRoom({
          roomId: 'alice_and_bob',
          hooks: {
            onMessage: message => {
              // console.log("received message", message)
              this.setState({
                messages: [...this.state.messages, message] //set new message to old messages
              })
            }
          }
        })
      }).catch(err => console.log('connection error:', err))
  }

  //retrieve form input and send tthourgh api
  sendMessage(userInputText) {
    this.currentUser.sendMessage({
      //text: text,
      text: userInputText,  // passing to api chat object text
      roomId: 'alice_and_bob'
    })
  }

  render() {
    return (
      <div className="app">
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={[...this.state.messages]}/>
        <SendmessageForm sendMessage={this.sendMessage}/>
      </div>
    )
  }
}

export default App;
