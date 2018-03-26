import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {fname: "",lname: "", uname: "", pass: ""};
    this.setFname = this.setFname.bind(this);
    this.setLname = this.setLname.bind(this);
    this.setUname = this.setUname.bind(this);
    this.setPass = this.setPass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(event) {
    console.log(this.state);
    $.ajax({
      type: "post",
      url: "/test",
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
        <h3>Fill Out Form</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="first name" onChange={this.setFname}/>
          <input type="text" placeholder="last name" onChange={this.setLname}/>
          <input type="text" placeholder="username" onChange={this.setUname}/>
          <input type="text" placeholder="password" onChange={this.setPass}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  };
}

export default App;
