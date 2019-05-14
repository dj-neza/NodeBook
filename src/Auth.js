import React, { Component } from "react";
import './App.css';
import modelInstance from './data/StudentModel';

class Auth extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			name: '',
			role: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkInput = this.checkInput.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		let name = target.name;

		switch (name) {
			case 'email':
				console.log("email: " + target.value);
				this.setState({
					email: target.value
				})
				break;
			case 'password':
				console.log("password: " + target.value);
				this.setState({
					password: target.value
				})
				break;
			case 'name':
				console.log("name: " + target.value);
				this.setState({
					name: target.value
				})
				break;
			case 'role':
				console.log("role: " + target.value);
				this.setState({
					role: target.value
				})
				break;
		default:
			console.log('default');
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("submit");
		let email = this.state.email;
		let password = this.state.password;
		let name = this.state.name;
		let role = this.state.role;
		modelInstance.createAccount(email, password, name, role);
	}


	checkInput() {
		if(this.state.email === '' || this.state.password === '' || this.state.name === ''
		|| this.state.role === '') {
			return true;
		}
		return false;
	}

	render() {

		return (
			<div className="FormCenter">
				<form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="email">E-Mail Address</label>
						<input
						required
						type="text"
						name="email"
						id="email" className="FormField__Input" placeholder="Enter your email"
						value={this.state.email}
						onChange={this.handleChange}/>
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="password">Password</label>
						<input
							required
							type="text"
							name="password"
							id="password" className="FormField__Input" placeholder="Enter your password"
							value={this.state.password}
							onChange={this.handleChange}/>
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="name">Name</label>
						<input
							required
							type="text"
							name="name"
							id="name" className="FormField__Input" placeholder="Enter your name"
							value={this.state.name}
							onChange={this.handleChange}/>
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="role">Role</label>
						<input
							required
							type="text"
							name="role"
							id="role" className="FormField__Input" placeholder="Enter your role (teacher or student)"
							value={this.state.role}
							onChange={this.handleChange}/>
					</div>

					<div className="FormField">
						<button className="FormField__Button mr-20" disabled={this.checkInput()}>Sign Up</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Auth;