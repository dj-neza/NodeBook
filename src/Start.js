import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Row } from "react-bootstrap";
import { modelInstance } from './data/StudentModel';
import './App.css';
import NavLink from "react-bootstrap/NavLink";
  
class Start extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        windowHeight: 0,
        windowWidth: 0,
        status: 'INITIAL', 
        studentID: modelInstance.getStudentId(), 
        // Qid: this.props.match.params.taskId
      }

      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {    
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);    
        console.log(this.state.Qid);
        modelInstance.setQuestionnaire(this.state.Qid);
        modelInstance.fetchQuestions(this.state.studentID, this.state.Qid).then(questions => {
          modelInstance.setQuestions(questions);

          let responseArray = questions.info.questions.map(question => []); // TODO: (question.type == 'sociometric') ? [] : 3);
          modelInstance.setResponses(responseArray);
          console.log("lol");
          this.setState({
            status: 'LOADED'
          });
        }).catch(() => {
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
        const teacher = this.props.teacher;
        let show; 

        switch (this.state.status) {
          case 'INITIAL':
            show = <b style={{padding: "40px"}}>Loading...</b>
            break;
          case 'LOADED':
          console.log("lala");
              show = <div style={{width: "100%", height: h, backgroundColor: "#f6f6f6"}} align="center">
                        <h3 style={{color: "#3f3f3f", padding: "30px", paddingTop: "80px"}}>Start a questionnaire from your teacher {teacher}</h3>
                        <div style={{marginTop: "150px", padding: "5px"}}><Link to={{
                            pathname: "/question/" + modelInstance.getQuestions().info.questions[0].question_no, 
                            query:{studentid: this.state.studentID}}}>
                            <Button variant="info" style={{width: "80%"}}>START</Button>
                        </Link></div>
                        <div style={{padding: "5px"}}><Link to={{
                          pathname: "/student", 
                          query:{studentid: false}}}>
                            <Button variant="secondary" style={{width: "80%"}}>CANCEL</Button> 
                        </Link></div>
                    </div>
            break;
          default:
            show = <b style={{padding: "40px"}}>Could not load the questionnaire, please try again.</b>
            break;
        }
      return (
        <div className="start" align="center">
            {show}
            <div className="FormTitle">
                <Link to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</Link> or <Link to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</Link>
            </div>
        </div>
      );
    }
  }
  
  export default Start;