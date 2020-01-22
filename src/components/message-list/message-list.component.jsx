import React from 'react';
import './message-list.style.css';

// Dummy data for test
const DUMMY_DATA = [
	{
		senderId: 'James',
		text: 'hello Saraha'
	},
	{
		senderId: 'Greta',
		text: 'hello  everyone'
	},
	{
		senderId: 'Harry',
		text: 'hello Run'
	}
]

class MessageList extends React.Component {
	render() {
		return (
			<div className='message-list'>
					{
						DUMMY_DATA.map((message,index)=>{
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