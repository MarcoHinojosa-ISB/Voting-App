import React from 'react';
import {withRouter} from "react-router-dom";

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFname = this.setFname.bind(this);
    this.setLname = this.setLname.bind(this);
    this.setUname = this.setUname.bind(this);
    this.setPass = this.setPass.bind(this);
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
    $.ajax({
      type: "post",
      url: "/api/auth/check-existing-username",
      data: this.state,
      success: function(result){
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
        if(result.length >= 1){
          this.unameErrors.push("Username already exists");
        }
        // check password
        if(this.state.pass.length === 0)
          this.passErrors.push("Password cannot be empty");
        else if(!this.state.pass.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/))
          this.passErrors.push("Password must be at least 1 number and 1 letter");

        if(this.fnameErrors.length > 0 || this.lnameErrors.length > 0 || this.unameErrors.length > 0 || this.passErrors.length > 0)
          callback(true);
        else
          callback(false);
      }.bind(this),
      error: function(err){
        this.serverError = err.responseText;
        callback(true);
      }.bind(this)
    });
  }
  handleSubmit(event){
    this.checkInput((err) => {
      if(err){
        this.setState({errorsFound: true});
      }
      else{
        $.ajax({
          type: "post",
          url: "/api/auth/sign-up",
          data: this.state,
          success: function(result){
            this.props.history.push(result);
          }.bind(this),
          error: function(err){
            if(err.responseText === "Username already exists")
              this.unameErrors.push(err.responseText);
            else
              this.serverError = err.responseText;

            this.setState({errorsFound: true});
          }.bind(this)
        });
      }
    })
    event.preventDefault();
  }

  // Life Cycle Methods
  componentWillMount(){
    let user = JSON.parse(localStorage.getItem('state'));

    if(user && user.username)
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
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="first name" maxLength="12" onChange={this.setFname}/>
          {fnameErrors}
          <ErrorMessage errors={this.fnameErrors}/>
          <input type="text" placeholder="last name" maxLength="12" onChange={this.setLname}/>
          {lnameErrors}
          <ErrorMessage errors={this.lnameErrors}/>
          <input type="text" placeholder="username" maxLength="12" onChange={this.setUname}/>
          {unameErrors}
          <ErrorMessage errors={this.unameErrors}/>
          <input type="text" placeholder="password" maxLength="16" onChange={this.setPass}/>
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
