import React from 'react';
import './message-list.style.css';
import Message from '../message/message.component';

// //Test Data
// import DummyData from './dummydata-test'

// // Dummy data for test
// const testData = DummyData;

const MessageList = (props) =>(
	<div className='message-list'>
				{
					props.messages.map((message, index) => {
						return (
							<Message key={index} username={message.senderId} text={message.text}/>
						)
					})
				}
			</div>
)

export default MessageList;