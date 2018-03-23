import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Polls from "./polls/index.jsx";
import About from "./about/index.jsx";
import Navigation from "./navigation/index.jsx";

class Empty extends React.Component{
  render(){
    return(
      <h1>
        Default Route
      </h1>
    );
  }
}

class App extends React.Component{
  render(){
    return (
      <Router>
        <div>

          <Navigation />


          <Switch>
            <Route exact path="/" component={Empty} />
            <Route path="/polls" component={Polls} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
