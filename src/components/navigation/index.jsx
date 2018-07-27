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
  logOut(){
    store.dispatch(loggedOut());
    this.props.history.push("/");
  }

  // Life Cycle Methods
  render(){
    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);

      var links = (
        <ul>
          <li className="username">
            {user.username} <i className="fa fa-angle-down"></i>
            <ul className="dropdown">
              <li><Link to="/polls-own">My polls</Link></li>
              <li><Link to="/poll-create">Create a Poll</Link></li>
              <li onClick={this.logOut.bind(this)}>Logout</li>
            </ul>
          </li>
        </ul>
      )
    }
    catch(err){
      var links = (
        <ul>
          <li className="authBtn"><Link to="/login">Login</Link></li>
          <li className="authBtn"><Link to="/signup">Signup</Link></li>
        </ul>
      )
    }

    return (
      <div id="navigation">
        <h2><Link to="/">PollBot</Link></h2>

        {links}
      </div>
    );
  }
}

export default withRouter(App);
