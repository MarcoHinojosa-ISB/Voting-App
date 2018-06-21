import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import store from '../../store/index.jsx';
import {loggedOut} from '../../store/actions/userActions.jsx';
import jwt from 'jsonwebtoken';
import jwtsecret from "../../../jwtsecret.js";

class App extends React.Component{
  constructor(props){
    super(props);
  }

  // Custom Methods
  home(){
    this.props.history.push("/");
  }
  myPolls(){
    this.props.history.push("/polls-own");
  }
  createPolls(){
    this.props.history.push("/poll-create");
  }
  logIn(){
    this.props.history.push("/login");
  }
  signUp(){
    this.props.history.push("/signup");
  }
  logOut(){
    store.dispatch(loggedOut());
    this.props.history.push("/");
  }

  // Life Cycle Methods
  render(){
    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle error yet
    }

    if(user && user.username){
      var links = (
        <ul>
          <li className="username">
            {user.username} <i className="fa fa-angle-down"></i>
            <ul className="dropdown">
              <li onClick={this.myPolls.bind(this)}>My polls</li>
              <li onClick={this.createPolls.bind(this)}>Create a Poll</li>
              <li onClick={this.logOut.bind(this)}>Logout</li>
            </ul>
          </li>
        </ul>
      )
    }
    else{
      var links = (
        <ul>
          <li className="authBtn" onClick={this.logIn.bind(this)}>Login</li>
          <li className="authBtn" onClick={this.signUp.bind(this)}>Signup</li>
        </ul>
      )
    }

    return (
      <div id="navigation">
        <h2 onClick={this.home.bind(this)}>PollBot</h2>

        {links}
      </div>
    );
  }
}

export default withRouter(App);
