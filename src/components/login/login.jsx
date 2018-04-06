import React from 'react';
import {withRouter} from "react-router-dom";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {uname: "", pass: ""};
  }

  setUname(event){
    this.setState({uname: event.target.value})
  }
  setPass(event){
    this.setState({pass: event.target.value})
  }
  handleSubmit(event) {
    console.log(this.state);
    $.ajax({
      type: "post",
      url: "/api/login/sign-in",
      data: this.state,
      success: function(result){
        this.props.history.push(result);
      }.bind(this),
      error: function(err){
        console.log("failure", err);
      }
    });
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <h3>Enter Login Info</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="username" onChange={this.setUname.bind(this)}/>
          <input type="text" placeholder="password" onChange={this.setPass.bind(this)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  };
}

export default withRouter(App);
