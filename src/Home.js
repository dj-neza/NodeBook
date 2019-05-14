import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import { modelInstance } from './data/StudentModel';
import {MdRefresh} from 'react-icons/md';
import './App.css';
  
class Home extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        windowHeight: 0,
        windowWidth: 0,
        status: 'INITIAL', 
        studentID: modelInstance.getStudentId(), 
        noActive: true,
        questionnaires: []
      }
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {    
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);    

        modelInstance.getAllQuestionnaires(this.state.studentID).then(qs => {
          console.log(qs);
          if (qs.experiments.length != 0) {
            this.setState({noActive: false});
            this.state.questionnaires = qs.experiments;
            for (var i = 0; i < qs.experiments.length; i++) {
                var d = new Date(qs.experiments[i].date);
                this.state.questionnaires[i].date = d.toLocaleDateString();
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
        modelInstance.getAllQuestionnaires(this.state.studentID).then(qs => {
            if (qs.experiments.length != 0) {
              this.state.questionnaires = qs.experiments;
              for (var i = 0; i < qs.experiments.length; i++) {
                var d = new Date(qs.experiments[i].date);
                this.state.questionnaires[i].date = d.toLocaleDateString();
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
                            <Col xs={{span: 8, offset: 1}}><h3>Assigned tasks: </h3></Col>
                            <Col xs={{span: 3}} onClick={this.refresh.bind(this)}><MdRefresh style={{width: "30", height: "30", color: "#3f3f3f"}}/></Col>
                        </Row>
                        {this.state.noActive == false && this.state.questionnaires.map(q => 
                        <div key={q.id}><Link to={{pathname: "/student/" + q.id}}><div className="alo" style={{backgroundColor: 'white'}} align="center">
                                <div style={{color: "#3f3f3f"}}>Task {q.id} - {q.date} </div>
                        </div></Link></div>)}
                        {this.state.noActive == true && <div style={{color: "#3f3f3f"}}>No active tasks.</div>}
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
  
  export default Home;