import React from 'react';
import './message-list.style.css';

// //Test Data
// import DummyData from './dummydata-test'

// // Dummy data for test
// const testData = DummyData;

class MessageList extends React.Component {
	render() {
		return (
			<div className='message-list'>
					{
					this.props.messages.map((message,index)=>{
							return (
								<div key={index} className="message">
									<div className="message-username"> {message.senderId}</div>
									<div className="message-text"> {message.text}</div>
								</div>
							)
						})
					}
			</div>

		)
	}
}

export default MessageList;