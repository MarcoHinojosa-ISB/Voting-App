import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Polls from "./polls/index.jsx";
import Login from "./login/index.jsx";
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
            <Route exact path="/" render={() => <Empty />} />
            <Route path="/polls" render={() => <Polls />} />
            <Route path="/login" render={(props) => <Login login={true} {...props} />} />
            <Route path="/signup" render={(props) => <Login login={false} {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
