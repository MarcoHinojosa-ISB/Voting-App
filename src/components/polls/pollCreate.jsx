import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import store from '../../store/index.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {title: "", options: [], newOption: "", pollCreated: false};
    this.removeOption = this.removeOption.bind(this);
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
  removeOption(index){
    this.setState({options: this.state.options.filter(function(val, i){
        return i !== index;
      })
    });
  }
  handleKeyPress(event){
    if(event.key === 'Enter')
      this.addOption();
  }
  handleSubmit(event){
    event.preventDefault();
    let data = {
      uname: store.getState().user.username,
      title: this.state.title,
      options: this.state.options
    }

    Axios.post('/api/polls/create-poll', data)
    .then(result => {
      console.log(result);
      this.setState({pollCreated: true});
    })
    .catch(err => {
      console.log(err);
    });
  }
  newPoll(event){
    this.setState({title: "", options: [], newOption: "", pollCreated: false});
  }

  // Life Cycle Methods
  componentWillMount(){
    if(!store.getState().user.username)
      this.props.history.push("/");
  }
  render(){
    //render currently added options
    var options = this.state.options.map((val, i) => {
      return (
        <div className="options" key={i}>
          <span>{val}</span><button type="button" onClick={() => this.removeOption(i)}>x</button>
        </div>
      )
    });
    var submit = this.state.title && this.state.options.length > 1 ? (
      <button type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
    ) : (
      <button type="button" className="disabled">Submit</button>
    )

    //poll created
    if(this.state.pollCreated){
      var content = (
        <div className="done">
          <h2>Poll has been successfully created</h2>
          <button type="button" onClick={this.newPoll.bind(this)}>New Poll +</button>
        </div>
      )
    }

    //input form
    else{
      var content = (
        <div className="form">
          <input type="text" placeholder="Title" maxLength="20" onChange={this.setTitle.bind(this)}/>
          {options}
          <div className="option-input">
            <input type="text" placeholder="Add an option" maxLength="20"
              value={this.state.newOption}
              onChange={this.setNewOption.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}/>
            <button type="button" onClick={this.addOption.bind(this)}>+</button>
          </div>
          {submit}
        </div>
      )
    }

    return (
      <div id="poll-create">
        <h1>Create a new poll below</h1>
        {content}
      </div>
    )
  }
}

export default withRouter(App);
