import React from 'react';
//3rd parties dependencies
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from './config'
//components
import MessageList from './components/message-list/message-list.component'
import SendmessageForm from './components/sendmessage-form/sendmessage-form.component'
//style
import './App.css';

class App extends React.Component {

  constructor() {
    super(); //calling the super on the react.component class
    this.state = {
      messages: []
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
        this.currentUser.subscribeToRoom({
          roomId: 'alice_and_bob',
          hooks: {
            onMessage: message => {
              //console.log("received message", message.text)
              this.setState({
                messages: [...this.state.messages, message] //set new message to old messages
              })
            }
          }
        })
      })
  }
//retrieve form input and send tthourgh api
  sendMessage(userInputText){
    this.currentUser.sendMessage({
      //text: text,
      text: userInputText,  // passing to api chat object text
      roomId: 'alice_and_bob'
    })
  }

  render() {
    return (
      <div className="app">
        <MessageList messages={this.state.messages}></MessageList>
        <SendmessageForm sendMessage={this.sendMessage}></SendmessageForm>
      </div>
    )
  }
}

export default App;
