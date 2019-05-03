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
        questions: modelInstance.getQuestions()
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
        modelInstance.setAnswerMarked(parseInt(this.props.match.params.id)-1, event.currentTarget.id);
        let color = this.state.questions[parseInt(this.props.match.params.id)-1].answers[event.currentTarget.id].marked ? '#388E8E' : 'white';
        this.setState({ questions: modelInstance.getQuestions() });
        //this.forceUpdate();
    }
    render() {
        let h = this.state.windowHeight - 62;
        let id = this.props.match.params.id;
        let back = (parseInt(id) -2 < 0) ? "/" : ("/question/" + (parseInt(id)-1));
        let next = (parseInt(id) +1 <= this.state.questions.length) ? ("/question/" + (parseInt(id)+1)): "/end" ;
        console.log(this.state.questions);
      return (
        <div className="start" align="center">
            <div style={{width: "100%", height: h, backgroundColor: "#f6f6f6"}} align="center">
                <h4 style={{color: "#3f3f3f", padding: "30px", paddingTop: "80px"}}>{id}. {this.state.questions[parseInt(id)-1].content}</h4>
                <div style={{ height: "360px", overflow: "scroll", backgroundColor: "white"}}>
                    {this.state.questions[parseInt(id)-1].answers.map((answer, i) => 
                    <div key={i} id={i} className="alo" style={answer.marked ? {backgroundColor: '#388E8E'} : {backgroundColor: 'white'}} align="center" onClick={this.changeColor.bind(this)}>
                            {answer.content}
                    </div>)}
                </div>
                <div style={{paddingTop: "5px"}} >
                    <div style={{float: "left"}}><Link to={back}><div><MdKeyboardArrowLeft style={{width: "40", height: "40"}}/>Back</div></Link></div>
                    <div style={{float: "right", paddingRight: "15px"}}><Link to={next}><div><MdKeyboardArrowRight style={{width: "40", height: "40"}}/>Next</div></Link></div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Question;