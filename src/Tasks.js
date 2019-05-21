import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { modelInstance } from './data/StudentModel';
import {MdRefresh} from 'react-icons/md';
import './App.css';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Tasks extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        windowHeight: 0,
        windowWidth: 0,
        status: 'INITIAL', 
        // studentID: modelInstance.getStudentId(),
        studentID: cookies.get("studentID"),
        token: cookies.get("token"),
        noActive: true,
        questionnaires: []
      }
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        modelInstance.getAllQuestionnaires(this.state.studentID, this.state.token).then(qs => {
          if (qs.experiments.length != 0) {
            this.setState({noActive: false});
            this.state.questionnaires = qs.experiments;
            for (var i = 0; i < qs.experiments.length; i++) {
                let utcSeconds = new Date(qs.experiments[i].date);
                let d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                let date = JSON.stringify(d).split("T")[0].split("\"")[1];
                console.log(date);
                this.state.questionnaires[i].date = date;
            }
          }
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

    refresh(e) {
        this.setState({status: "INITIAL"});
        modelInstance.getAllQuestionnaires(this.state.studentID, this.state.token).then(qs => {
            if (qs.experiments.length != 0) {
              this.state.questionnaires = qs.experiments;
              for (let i = 0; i < qs.experiments.length; i++) {
                  let utcSeconds = new Date(qs.experiments[i].date);
                  let d = new Date(0);
                  d.setUTCSeconds(utcSeconds);
                  let date = JSON.stringify(d).split("T")[0].split("\"")[1];
                  console.log(date);
                  this.state.questionnaires[i].date = date;
               }
            }
            this.setState({
              status: 'LOADED'
            });
  
          }).catch(() => {
            this.setState({
              status: 'ERROR'
            })
        });
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
              show = <div style={{width: "100%", height: h, backgroundColor: "#f6f6f6"}} align="center">
                        <Row style={{color: "#3f3f3f", paddingBottom: "5px", paddingTop: "80px", paddingRight: "5px"}}>
                            <Col xs={{span: 8, offset: 1}}>
                                <h3>Assigned tasks</h3>
                            </Col>
                            <Col xs={{span: 3}} onClick={this.refresh.bind(this)}>
                                <MdRefresh style={{width: "30", height: "30", color: "#3f3f3f"}}/>
                            </Col>
                        </Row>
                        <div style={{ maxHeight: "345px", overflow: "scroll", backgroundColor: "white"}}>
                            {this.state.noActive == false && this.state.questionnaires.map(q => 
                            <div key={q.id}>
                                <Link to={{pathname: "/student/" + q.id}}>
                                    <div className="alo" style={{backgroundColor: '#FDCD61'}} align="center">
                                        <div style={{color: "#3f3f3f"}}>Questionnaire {q.date}</div>
                                    </div>
                                </Link>
                            </div>)}
                            {this.state.noActive == true && <div className="alo" style={{color: "#3f3f3f", backgroundColor: '#FDCD61'}}>No active tasks.</div>}
                        </div>
                    </div>
            break;
          default:
            show = <b style={{padding: "40px"}}>Failed to load data, please try again</b>
            break;
        }
      return (
        <div className="start" align="center">
            {show}
        </div>
      );
    }
  }
  
  export default Tasks;