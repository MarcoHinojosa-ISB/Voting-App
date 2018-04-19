import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {title: "", options: [], newOption: "", pollCreated: false};
  }

  // Custom Methods
  setTitle(event){
    this.setState({title: event.target.value});
  }
  setNewOption(event){
    this.setState({newOption: event.target.value});
  }
  addOption(){
    if(this.state.newOption.length > 0){
      let tmp = this.state.options;
      tmp.push(this.state.newOption);

      this.setState({options: tmp, newOption: ""});
    }
  }
  handleKeyPress(event){
    if(event.key === 'Enter')
      this.addOption();
  }
  handleSubmit(event){
    let user = JSON.parse(localStorage.getItem('state'));

    let data = {
      uname: user.username,
      title: this.state.title,
      options: this.state.options
    }

    $.ajax({
      type: "post",
      data: data,
      url: "/api/polls/create-poll",
      success: function(result){
        console.log("success");
        this.setState({pollCreated: true});
      }.bind(this),
      error: function(err){
        console.log(err);
      }
    })
    event.preventDefault();
  }
  newPoll(event){
    this.setState({title: "", options: [], newOption: "", pollCreated: false})
  }

  // Life Cycle Methods
  componentWillMount(){
    let user = JSON.parse(localStorage.getItem('state'));

    if(!user || !user.username)
      this.props.history.push("/");
  }
  render(){
    var options = this.state.options.map(function(val, i){
      return (<div className="options" key={i}>{val}</div>)
    });

    if(this.state.pollCreated){
      var content = (
        <div>
          <h2>Poll has been successfully created</h2>
          <div>
            <button type="button" onClick={this.newPoll.bind(this)}>New Poll +</button>
          </div>
        </div>
      )
    }
    else{
      var content = (
        <div>
          <input type="text" placeholder="Title" onChange={this.setTitle.bind(this)}/>
          {options}
          <div className="option-input">
            <input type="text" placeholder="New option" maxLength="60"
              value={this.state.newOption}
              onChange={this.setNewOption.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}/>
            <button type="button" onClick={this.addOption.bind(this)}>+</button>
          </div>
          <button type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
      )
    }

    return (
      <div id="poll-create">
        <h1>Create a new poll below</h1>
        <form>
          {content}
        </form>
      </div>
    )
  }
}

export default App;
