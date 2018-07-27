import React from 'react';
import Axios from 'axios';
import {withRouter} from "react-router-dom";
import store from '../../store/index.jsx';
import {loggedIn} from '../../store/actions/userActions.jsx';
import jwt from 'jsonwebtoken';
import jwtsecret from "../../../jwtsecret.js";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {uname: "", pass: "", error: ""};
  }

  // Custom Methods
  setUname(event){
    this.setState({uname: event.target.value})
  }
  setPass(event){
    this.setState({pass: event.target.value})
  }
  handleSubmit(event) {
    Axios.post("/api/auth/log-in", this.state)
    .then(result => {
      store.dispatch(loggedIn(result.data.token));
      this.props.history.push(result.data.redirect);
    })
    .catch(err => {
      if(err.response.status === 404)
        this.setState({error: "Something went wrong, try again later"});
      else
        this.setState({error: err.response.data});
    })
    event.preventDefault();
  }

  // Life Cycle Methods
  componentWillMount(){
    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
      this.props.history.push("/");
    }
    catch(err){
      // no need to handle error yet
    }
  }
  render(){
    if(this.state.error.length > 0)
      var error = (<small>{this.state.error}</small>);

    return (
      <div id="login">
        <h3>Enter Login Info</h3>
        {error}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="username" onChange={this.setUname.bind(this)}/>
          <input type="password" placeholder="password" onChange={this.setPass.bind(this)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  };
}

export default withRouter(App);
