import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import store from "../store/index.jsx";
import Navigation from "./navigation/index.jsx";
import Home from "./home/index.jsx";
import Auth from "./auth/index.jsx";
import Polls from "./polls/index.jsx";

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
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route path="/polls" render={(props) => <Polls type={"list"}{...props} />} />
            <Route path="/polls-own" render={(props) => <Polls type={"list-own"}{...props} />} />
            <Route path="/poll-create" render={(props) => <Polls type={"create"}{...props} />} />
            <Route path="/poll/:title" render={(props) => <Polls type={"single"}{...props} />} />
            <Route path="/login" render={(props) => <Auth login={true} {...props} />} />
            <Route path="/signup" render={(props) => <Auth login={false} {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
