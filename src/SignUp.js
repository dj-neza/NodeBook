import React, { Component } from "react";
import './App.css';
import modelInstance from './data/StudentModel';
import Cookies from 'universal-cookie';

import {
	withRouter
} from 'react-router-dom';

const cookies = new Cookies();

class SignUp extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			name: '',
			role: 'student',
			token:''
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
				this.setState({
					email: target.value
				})
				break;
			case 'password':
				this.setState({
					password: target.value
				})
				break;
			case 'name':
				this.setState({
					name: target.value
				})
				break;
			case 'role':
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
		let email = this.state.email;
		let password = this.state.password;
		let name = this.state.name;
		let role = this.state.role;
		modelInstance.createAccount(email, password, name, role).then(result => {
			result.json().then(data => ({
					token: data.auth_token,
					studentID: data.student_id
				})
			).then(res => {
				cookies.set('token', res.token, { path: '/' });
				cookies.set('studentID', res.studentID, {path: '/'});
			})
		});
		setTimeout(() => this.props.history.push('/tasks'), 800)
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
				<form onSubmit={this.handleSubmit} className="FormFields">
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
							type="password"
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
						<button className="FormField__Button mr-20" disabled={this.checkInput()}>Sign Up</button>
					</div>
				</form>
			</div>
		)
	}
}

export default withRouter(SignUp);