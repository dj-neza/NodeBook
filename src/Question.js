import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import { modelInstance } from './data/StudentModel';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import './App.css';
  
class Question extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        windowHeight: 0,
        windowWidth: 0,
        questions: modelInstance.getQuestions().info.questions,
        answers: modelInstance.getQuestions().students,
        response: modelInstance.getResponsesForQ(this.props.match.params.id),
        studentID: modelInstance.getStudentId(),
        id: this.props.match.params.id, 
        Qid: modelInstance.getQuestionnaire()
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
    changeColor(event) {
      let newResponse = this.state.response;
      let changed = false;
      if (this.state.response.length == 0) {
        newResponse[0] = parseInt(event.currentTarget.id);
      }
      else {
        for (var i = 0; i < this.state.response.length; i++) {
          if (this.state.response[i] == parseInt(event.currentTarget.id)) {
            newResponse.splice(i, 1);
            changed = true;
            break;
          }
          else if (this.state.response[i] > parseInt(event.currentTarget.id)) {
            newResponse.splice(i, 0, parseInt(event.currentTarget.id));
            changed = true;
            break;
          }
        }
        if (!changed ) { newResponse.push(parseInt(event.currentTarget.id)); }
      }
      this.setState({ response: newResponse });
    }
    isItMarked(id) {
      if (this.state.response.length == 0) return false;
      for (var i = 0; i < this.state.response.length; i++) {
        if (this.state.response[i] == parseInt(id)) return true; 
      }
      return false;
    }
    updateFnBack(event) {
      modelInstance.setResponsesForQ(this.state.id, this.state.response);
      if (parseInt(this.state.id)-1 >= 0) {
        this.setState({id: (parseInt(this.state.id)-1).toString(), response: modelInstance.getResponsesForQ(parseInt(this.state.id)-1)});
      }
    }
    updateFnNext(event) {
      modelInstance.setResponsesForQ(this.state.id, this.state.response);
      if (parseInt(this.state.id)+1 < this.state.questions.length) {
        this.setState({id: (parseInt(this.state.id)+1).toString(), response: modelInstance.getResponsesForQ(parseInt(this.state.id)+1)});
      }
    }

  
    render() {
        let h = this.state.windowHeight - 62;
        let id = this.props.match.params.id;
        let back = (parseInt(id)-1 < 0) ? "/" : ("/question/" + (parseInt(id)-1));
        let next = (parseInt(id)+1 < this.state.questions.length) ? ("/question/" + (parseInt(id)+1)): "/end" ;
      return (
        <div className="start" align="center">
            <div style={{width: "100%", height: h, backgroundColor: "#f6f6f6"}} align="center">
                <h4 style={{color: "#3f3f3f", padding: "30px", paddingTop: "80px"}}>{parseInt(id)+1}. {this.state.questions[parseInt(id)].text}</h4>
                <div style={{ height: "360px", overflow: "scroll", backgroundColor: "white"}}>
                    {this.state.answers.map((answer, i) => 
                    <div key={answer.id} id={answer.id} className="alo" style={this.isItMarked(answer.id) ? {backgroundColor: '#388E8E'} : {backgroundColor: 'white'}} align="center" onClick={this.changeColor.bind(this)}>
                            {answer.name}
                    </div>)}
                </div>
                <div style={{paddingTop: "5px"}} >
                    <div style={{float: "left"}}><Link to={{pathname: back, 
                          query:{studentid: this.state.studentID}}} onClick={this.updateFnBack.bind(this)}><div><MdKeyboardArrowLeft style={{width: "40", height: "40"}}/>Back</div></Link></div>
                    <div style={{float: "right", paddingRight: "15px"}}><Link to={{pathname: next, 
                          query:{studentid: this.state.studentID}}} onClick={this.updateFnNext.bind(this)}><div><MdKeyboardArrowRight style={{width: "40", height: "40"}}/>Next</div></Link></div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Question;