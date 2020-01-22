import React from 'react';
import './sendmessage-form.style.css';

class SendMessageForm extends React.Component {

	constructor() {
		super();
		this.state = {
			message: ''
		}
		this.handleChange = this.handleChange.bind(this) //gives access to this.handlechange
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		this.setState({
			message: e.target.value
			//console.log(e.target.value);
		})
	}

	handleSubmit(e){
			e.preventDefault();
			//sending the message
			console.log(this.state.message)
	}

	render() {
		console.log(this.state.message)
		return (
			<form  onSubmit={this.handleSubmit} className='sendmessage-form'>
				<input type="text"
				placeholder='Message...'
				value={this.state.message}
				onChange={this.handleChange} />
			</form>
		)
	}
}

export default SendMessageForm;