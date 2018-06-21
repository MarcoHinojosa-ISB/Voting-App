import React from "react";
import {Route, Link} from 'react-router-dom';
import store from '../../store/index.jsx';
import jwt from 'jsonwebtoken';
import jwtsecret from "../../../jwtsecret.js";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {loggedIn: false};
  }

  render(){
    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle error yet
    }

    if(user){
      var options = (
        <div>
          <Link to="/poll-create">Create poll</Link>
          <Link to="/polls">View polls</Link>
        </div>
      )
    }
    else{
      var options = (
        <div>
          <Link to="/polls">View polls</Link>
        </div>
      )
    }

    return (
      <div id="home">
        <h1>PollBot</h1>
        <h5>Create custom polls on any topic, see live results</h5>
        {options}
      </div>
    );
  }
}

export default App;
