import React, { Component } from "react";
import {Link, Route} from "react-router-dom";

import Home from "./Home";
import Start from "./Start";
import Question from "./Question";
import End from "./End";

import logo from './imgs/icon1.png';
import logo_long from './imgs/transparent_NodeBook.png';
import { modelInstance } from './data/StudentModel';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        teacher: modelInstance.getTeacher()
      };
  }

  render() {
    return (
      <div className="App">
          <div style={{width: "100%", backgroundColor: "#dcdcdc", padding: "10px"}} align="center">
                  <Link to="/">
                      <img src={logo_long} style={{width: "40%"}} alt=""/>
                  </Link>
          </div>
          <Route exact path="/" 
            render={() => <Start teacher={this.state.teacher}  />} 
          />
          <Route exact path="/student"
            render={() => <Home />}  
          />
          <Route exact path="/student/:taskId"
            render={(props) => <Start {...props} teacher={this.state.teacher}  />}  
          />
          <Route 
            exact path="/question/:id" 
            render={(props) => <Question {...props} />}
          />
          <Route
              exact path="/end"
              render={(props) => <End {...props}  />}
          />
      </div>
    );
  }
}
export default App;