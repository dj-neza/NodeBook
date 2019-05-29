import React, { Component } from "react";
import './App.css';
import {Link} from "react-router-dom";

class Home extends Component {

	render() {

		return (
			<div className="FormTitle">
				<Link to="/sign-in" activeclassname="FormTitle__Link--Active" className="FormTitle__Link">Log In</Link> or <Link to="/sign-up" activeclassname="FormTitle__Link--Active" className="FormTitle__Link">Register</Link>
			</div>
		)
	}
}

export default Home;