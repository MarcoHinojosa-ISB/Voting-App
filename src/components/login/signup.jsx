import React from 'react';

// Error styling
var count = 1;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: "", lname: "", uname: "", pass: "",
      firstNameError: false,
      lastNameError: false,
      usernameExistsError: false,
      usernameError: false,
      passwordError: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFname = this.setFname.bind(this);
    this.setLname = this.setLname.bind(this);
    this.setUname = this.setUname.bind(this);
    this.setPass = this.setPass.bind(this);
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
  handleSubmit(event){
    // error handlers
    let usernameExistsError = false;
    let firstNameError = this.state.fname.length === 0 ? true : false;
    let lastNameError = this.state.lname.length === 0 ? true : false;
    let usernameError = this.state.uname.length === 0 ? true : false;
    let passwordError = this.state.pass.length < 6 ? true : false;

    if(!firstNameError && !lastNameError && !usernameError && !passwordError){
      let data = {
        fname: this.state.fname,
        lname: this.state.lname,
        uname: this.state.uname,
        pass: this.state.pass
      }

      $.ajax({
        type: "post",
        url: "/api/login/check-existing-username",
        data: data,
        success: function(result){
          if(result.length >= 1){
            usernameExistsError = true;
          }
          else{
            usernameExistsError = false;
            completeSignup(data);
          }
        },
        error: function(err){
          console.log("failure", err);
        }
      }).done(function(){
        this.setState({
          firstNameError: firstNameError,
          lastNameError: lastNameError,
          usernameExistsError: usernameExistsError,
          usernameError: usernameError,
          passwordError: passwordError
        });
      }.bind(this));
    } else{
      this.setState({
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        usernameExistsError: usernameExistsError,
        usernameError: usernameError,
        passwordError: passwordError
      });
    }

    function completeSignup(data){
      $.ajax({
        type: "post",
        url: "/api/login/sign-up",
        data: data,
        success: function(result){
          console.log("sign up success")
        }.bind(this),
        error: function(err){
          console.log("failure", err);
        }.bind(this)
      });
    }
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <h3>Enter your credentials</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="first name" maxLength="12" onChange={this.setFname}/>
          {this.state.firstNameError ? (<p>First name cannot be empty</p>) : (<div style={{display: 'none'}}></div>)}
          <input type="text" placeholder="last name" maxLength="12" onChange={this.setLname}/>
          {this.state.lastNameError ? (<p>Last name cannot be empty</p>) : (<div style={{display: 'none'}}></div>)}
          <input type="text" placeholder="username" maxLength="12" onChange={this.setUname}/>
          {this.state.usernameError ? (<p>Username cannot be empty</p>) : (<div style={{display: 'none'}}></div>)}
          {this.state.usernameExistsError ? (<p>Username already exists</p>) : (<div style={{display: 'none'}}></div>)}
          <input type="text" placeholder="password" maxLength="16" onChange={this.setPass}/>
          {this.state.passwordError ? (<p>Password must be at least 6 letters</p>) : (<div style={{display: 'none'}}></div>)}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  };
}

export default App;
