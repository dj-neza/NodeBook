import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Row } from "react-bootstrap";
import { modelInstance } from './data/StudentModel';
import './App.css';

import pic from './imgs/pic1.png';
  
class End extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        windowHeight: 0,
        windowWidth: 0,
        studentID: this.props.location.query.studentid,
        status: 'INITIAL',
      }
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {    
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);    
        modelInstance.submitQuestionnaire(this.state.studentID, {responses: modelInstance.getResponses()}).then(qs => {
          this.setState({
            status: 'LOADED'
          });
        }).catch(error => {
          this.setState({
            status: 'ERROR'
          })
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }

    render() {
        let h = this.state.windowHeight - 62;
        let show; 

        switch (this.state.status) {
          case 'INITIAL':
            show = <b style={{padding: "40px"}}>Loading...</b>
            break;
          case 'LOADED':
            show = <div style={{width: "100%", height: h, backgroundColor: "#f6f6f6"}} align="center">
                      <h3 style={{color: "#3f3f3f", padding: "30px", paddingTop: "80px"}}>Your answers have been sent to the teacher!</h3>
                      <h2 style={{color: "#3f3f3f", padding: "20px", paddingTop: "80px"}}>Thank you!</h2>

                      <img src={pic} width={100}/>
                      <div style={{padding: "5px"}}><Link to={{
                          pathname: "/student", 
                          query:{studentid: false}}}>
                            <Button variant="secondary" style={{width: "80%"}}>CLOSE</Button> 
                      </Link></div>
                  </div>
            break;
          default:
            show = <b style={{padding: "40px"}}>Could not upload response to server.</b>
            break;
        }
      return (
        <div className="end" align="center">
            {show}
        </div>
      );
    }
  }
  
  export default End;