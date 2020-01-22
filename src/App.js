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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
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
        //calling
        this.getRooms();

      }).catch(err => console.log('connection error:', err))
  }

  //get joinable room
  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms, //available room
          joinedRooms: this.currentUser.rooms //joined
        })
      }).catch(err => console.log('error on joinable room:', err))
  }

  // subscribe to room
  subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          // console.log("received message", message)
          this.setState({
            messages: [...this.state.messages, message] //set new message to old messages
          })
        }
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.getRooms()
      }).catch(err => console.log('error on subscribing to room', err))
  }
  //retrieve form input and send thorugh api
  sendMessage(userInputText) {
    this.currentUser.sendMessage({
      //text: text,
      text: userInputText,  // passing to api chat object text
      roomId: this.state.roomId
    })
  }

  render() {
    return (
      <div className="app">
        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={[...this.state.messages]} />
        <SendmessageForm sendMessage={this.sendMessage} />
      </div>
    )
  }
}

export default App;
