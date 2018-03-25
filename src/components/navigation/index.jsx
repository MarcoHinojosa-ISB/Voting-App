import React from 'react';
import {Route, Link} from 'react-router-dom';
import ReactDom from 'react-dom';

class App extends React.Component{
  render(){
    return (
      <div id="navigation">
        <h2><Link to="/" >Voting App</Link></h2>

        <ul>
          <li><Link to="/polls" >Polls</Link></li>
          <li><Link to="/login" >Login</Link></li>
        </ul>

      </div>
    );
  }
}

export default App;
