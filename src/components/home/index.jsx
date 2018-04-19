import React from "react";
import {Route, Link} from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {loggedIn: false};
  }

  render(){
    let user = JSON.parse(localStorage.getItem('state'));

    if(user && user.username){
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
