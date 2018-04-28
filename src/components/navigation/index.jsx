import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import store from '../../store/index.jsx';
import {loggedOut} from '../../store/actions/userActions.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  // Custom Methods
  myPolls(){
    this.props.history.push("/polls-own");
  }
  logOut(){
    store.dispatch(loggedOut());
    this.props.history.push("/");
  }

  // Life Cycle Methods
  render(){
    let user = store.getState().user;

    if(user && user.username){
      var links = (
        <ul>
          <li className="username">
            {user.username} <i className="fa fa-angle-down"></i>
            <ul className="dropdown">
              <li onClick={this.myPolls.bind(this)}>My polls</li>
              <li onClick={this.logOut.bind(this)}>Logout</li>
            </ul>
          </li>
        </ul>
      )
    }
    else{
      var links = (
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      )
    }

    return (
      <div id="navigation">
        <h2><Link to="/" >PollBot</Link></h2>

        {links}
      </div>
    );
  }
}

export default withRouter(App);
