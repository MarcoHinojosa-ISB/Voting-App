import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import store from '../../store/index.jsx';
import jwt from 'jsonwebtoken';
import jwtsecret from "../../../jwtsecret.js";

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

    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle error yet
    }

    let data = {
      uname: user.username,
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
    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle error yet
    }
    if(!user)
      this.props.history.push("/");
  }
  render(){
    //render currently added options + submit button
    var options = this.state.options.map((val, i) => {
      return (
        <div className="options" key={i}>
          <div>{val}</div><button type="button" onClick={() => this.removeOption(i)}>x</button>
        </div>
      )
    });
    var submit = this.state.title && this.state.options.length > 1 ? (
      <button type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
    ) : (
      <button type="button" className="disabled">Submit</button>
    );

    //poll created / input form
    if(this.state.pollCreated){
      var content = (
        <div className="done">
          <h2>Poll has been successfully created</h2>
          <button type="button" onClick={this.newPoll.bind(this)}>New Poll +</button>
        </div>
      )
    }
    else{
      var content = (
        <div className="form">
          <input type="text" placeholder="Title" maxLength="30" onChange={this.setTitle.bind(this)}/>
          {options}
          <div className="option-input">
            <input type="text" placeholder="Add an option" maxLength="50"
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
      <div id="polls-create">
        <h1>Create a new poll below</h1>
        {content}
      </div>
    )
  }
}

export default withRouter(App);
