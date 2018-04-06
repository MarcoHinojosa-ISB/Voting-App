import React from 'react';
import {withRouter} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: "", lname: "", uname: "", pass: "", errorsFound: false
    };
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
    else{
      $.ajax({
        type: "post",
        url: "/api/login/check-existing-username",
        data: this.state.uname,
        success: function(result){
          if(result.length >= 1)
            this.unameErrors.push("Username already exists")
        }.bind(this),
        error: function(err){
          console.log("failure", err);
        }
      });
    }
    // check password
    if(this.state.pass.length === 0)
      this.passErrors.push("Password cannot be empty");
    else if(!this.state.pass.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/))
      this.passErrors.push("Password must be at least 1 number and 1 letter");

    if(this.fnameErrors.length > 0 || this.lnameErrors.length > 0 || this.unameErrors.length > 0 || this.passErrors.length > 0)
      callback(true)
    else
      callback(false);
  }
  handleSubmit(event){
    this.checkInput((err) => {
      if(err){
        this.setState({errorsFound: true});
      }
      else{
        $.ajax({
          type: "post",
          url: "/api/login/sign-up",
          data: this.state,
          success: function(result){
            console.log(result);
            this.props.history.push(result);
          }.bind(this),
          error: function(err){
            console.log("failure", err);
          }
        });
      }
    })
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <h3>Enter your credentials</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="first name" maxLength="12" onChange={this.setFname}/>
          {this.fnameErrors.length > 0 ?
            (<i className="fa fa-exclamation-circle"></i>) :
            (<i></i>)}
          <ErrorMessage errors={this.fnameErrors}/>
          <input type="text" placeholder="last name" maxLength="12" onChange={this.setLname}/>
          {this.lnameErrors.length > 0 ?
            (<i className="fa fa-exclamation-circle"></i>) :
            (<i></i>)}
          <ErrorMessage errors={this.lnameErrors}/>
          <input type="text" placeholder="username" maxLength="12" onChange={this.setUname}/>
          {this.unameErrors.length > 0 ?
            (<i className="fa fa-exclamation-circle"></i>) :
            (<i></i>)}
          <ErrorMessage errors={this.unameErrors}/>
          <input type="text" placeholder="password" maxLength="16" onChange={this.setPass}/>
          {this.passErrors.length > 0 ?
            (<i className="fa fa-exclamation-circle"></i>) :
            (<i></i>)}
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
