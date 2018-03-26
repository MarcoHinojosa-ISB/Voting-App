import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {uname: "", pass: ""};
    this.setUname = this.setUname.bind(this);
    this.setPass = this.setPass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      url: "/test2",
      data: this.state
    }).done(function(result){
      console.log("done");
    }).fail(function(){
      console.log("failure");
    })
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <h3>Enter Credentials</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="username" onChange={this.setUname}/>
          <input type="text" placeholder="password" onChange={this.setPass}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  };
}

export default App;
