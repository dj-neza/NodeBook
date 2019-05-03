import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Row } from "react-bootstrap";
import { modelInstance } from './data/StudentModel';
import './App.css';
  
class Start extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        windowHeight: 0,
        windowWidth: 0,
      }
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {    
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);    
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }

    render() {
        let h = this.state.windowHeight - 62;

        const teacher = this.props.teacher;
      return (
        <div className="start" align="center">
            <div style={{width: "100%", height: h, backgroundColor: "#f6f6f6"}} align="center">
                <h3 style={{color: "#3f3f3f", padding: "30px", paddingTop: "80px"}}>Start a questionnaire from your teacher {teacher}</h3>
                <div style={{marginTop: "150px", padding: "5px"}}><Link to="/question/1">
                    <Button variant="info" style={{width: "80%"}}>START</Button>
                </Link></div>
                <div style={{padding: "5px"}}><Link to="/end">
                    <Button variant="secondary" style={{width: "80%"}}>CANCEL</Button> 
                </Link></div>
            </div>
        </div>
      );
    }
  }
  
  export default Start;