import React, { Component } from "react";
import {Link, Route, Switch} from "react-router-dom";

import Tasks from "./Tasks";
import Start from "./Start";
import Question from "./Question";
import End from "./End";

import logo_long from './imgs/transparent_NodeBook.png';
import { modelInstance } from './data/StudentModel';
import './App.css';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";

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
          <Switch>
            <Route exact path="/"
              render={() => <Home />}
            />
            <Route exact path="/tasks"
              render={() => <Tasks />}
            />
            <Route exact path="/sign-up"
              render={() => <SignUp />}
            />
            <Route exact path="/sign-in"
              render={() => <SignIn />}
            />
            <Route exact path="/student"
              render={() => <Tasks />}
            />
            <Route exact path="/student/:taskId"
              render={(props) => <Start {...props} teacher={this.state.teacher}  />}  
            />
            <Route exact path="/question/:id" 
              render={(props) => <Question {...props} />}
            />
            <Route exact path="/end"
              render={(props) => <End {...props}  />}
            />
          </Switch>
      </div>
    );
  }
}
export default App;