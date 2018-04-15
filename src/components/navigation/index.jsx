import React from 'react';
import {Route, Link} from 'react-router-dom';
import store from '../../store/index.jsx';
import {loggedOut} from '../../store/actions/userActions.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  // Custom Methods
  signOut(history){
    store.dispatch(loggedOut());
    history.push("/");
  }

  // Life Cycle Methods
  render(){
    let user = JSON.parse(localStorage.getItem('state'));

    if(user && user.username){
      var links = (
        <ul>
          <li className="username">{user.username}</li>
          <li>
            <Route render={({history}) => (<div onClick={() => this.signOut(history)}>Logout</div>)}></Route>
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

export default App;
