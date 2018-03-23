import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import ReactDom from 'react-dom';

class App extends React.Component{
  render(){
    return (
      <div id="navigation">
        <h2><NavLink to="/" >Voting App</NavLink></h2>

        <ul>
          <li><NavLink to="/polls" >Polls</NavLink></li>
          <li>Login</li>
        </ul>

      </div>
    );
  }
}

export default App;
