import React from 'react';
import './message.style.css'

const Message = (props) => (
	<div className="message">
		<div className="message-username"> {props.username}</div>
		<div className="message-text"> {props.text}</div>
	</div>
)

export default Message;