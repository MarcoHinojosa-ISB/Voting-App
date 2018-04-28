import React from 'react';
import Axios from 'axios';
import {withRouter} from "react-router-dom";
import store from "../../store/index.jsx";
import {loggedIn} from '../../store/actions/userActions.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: "", lname: "", uname: "", pass: "", errorsFound: false, serverError: false
    };
    this.serverError = "";
    this.fnameErrors = [];
    this.lnameErrors = [];
    this.unameErrors = [];
    this.passErrors = [];
    this.checkInput = this.checkInput.bind(this);
  }

  // Custom Methods
  setFname(event){
    this.setState({fname: event.target.value})
  }
  setLname(event){
    this.setState({lname: event.target.value})
  }
  setUname(event){
    this.setState({uname: event.target.value})
  }
  setPass(event){
    this.setState({pass: event.target.value})
  }
  checkInput(callback){
    Axios.post("/api/auth/check-existing-username", this.state)
    .then(result => {
      this.serverError = "";
      this.fnameErrors = [];
      this.lnameErrors = [];
      this.unameErrors = [];
      this.passErrors = [];

      // check first name
      if(this.state.fname.length === 0)
        this.fnameErrors.push("First name cannot be empty");
      // check last name
      if(this.state.lname.length === 0)
        this.lnameErrors.push("Last name cannot be empty");
      // check username
      if(this.state.uname.length === 0)
        this.unameErrors.push("Username cannot be empty");
      if(result.data.length >= 1){
        this.unameErrors.push("Username already exists");
      }
      // check password
      if(this.state.pass.length === 0)
        this.passErrors.push("Password cannot be empty");
      else if(!this.state.pass.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/))
        this.passErrors.push("Password must be at least 8 characters, 1 number, & 1 letter");

      if(this.fnameErrors.length > 0 || this.lnameErrors.length > 0 || this.unameErrors.length > 0 || this.passErrors.length > 0)
        callback(true);
      else
        callback(false);
    })
    .catch(err => {
      this.serverError = err.responseText;
      callback(true);
    })
  }
  handleSubmit(event){
    this.checkInput((err) => {
      if(err){
        this.setState({errorsFound: true});
      }
      else{
        Axios.post("/api/auth/sign-up", this.state)
        .then(result => {
          store.dispatch(loggedIn(this.state.uname, this.state.fname, this.state.lname));
          this.props.history.push(result.data.redirect);
        })
        .catch(err => {
          if(err.data.responseText === "Username already exists")
            this.unameErrors.push(err.data.responseText);
          else
            this.serverError = true;
          this.setState({errorsFound: true});
        })
      }
    });
    event.preventDefault();
  }

  // Life Cycle Methods
  componentWillMount(){
    if(store.getState().user.username)
      this.props.history.push("/");
  }
  render(){
    if(this.serverError)
      var serverError = (<small>Something went wrong, try again later</small>);
    else{
      if(this.fnameErrors.length > 0)
        var fnameErrors = (<i className="fa fa-exclamation-circle"></i>);
      if(this.lnameErrors.length > 0)
        var lnameErrors = (<i className="fa fa-exclamation-circle"></i>);
      if(this.unameErrors.length > 0)
        var unameErrors = (<i className="fa fa-exclamation-circle"></i>);
      if(this.passErrors.length > 0)
        var passErrors = (<i className="fa fa-exclamation-circle"></i>);
    }

    return (
      <div id="signup">
        <h3>Enter your credentials</h3>
        {serverError}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="first name" maxLength="12" onChange={this.setFname.bind(this)}/>
          {fnameErrors}
          <ErrorMessage errors={this.fnameErrors}/>
          <input type="text" placeholder="last name" maxLength="12" onChange={this.setLname.bind(this)}/>
          {lnameErrors}
          <ErrorMessage errors={this.lnameErrors}/>
          <input type="text" placeholder="username" maxLength="12" onChange={this.setUname.bind(this)}/>
          {unameErrors}
          <ErrorMessage errors={this.unameErrors}/>
          <input type="text" placeholder="password" maxLength="16" onChange={this.setPass.bind(this)}/>
          {passErrors}
          <ErrorMessage errors={this.passErrors}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  };
}

class ErrorMessage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var messages = this.props.errors.map(function(val, i){
      return <li key={i}>{val}</li>
    });

    return (
      <div>
        <ul>
          {messages}
        </ul>
      </div>
    )
  }
}

export default withRouter(App);
