import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Polls from "./polls/index.jsx";
import About from "./about/index.jsx";

class App extends React.Component{
  render(){
    return (
      <Router>
        <div>
          
          <strong>Route Test</strong>
          <ul>
            <li><Link to="/" >Polls</Link></li>
            <li><Link to="/about" >About</Link></li>
          </ul>

          <Switch>
            <Route exact path="/" component={Polls} />
            <Route path="/about" component={About} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
