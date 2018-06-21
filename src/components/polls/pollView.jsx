import React from "react";
import Axios from "axios";
import {Link, withRouter} from "react-router-dom";
import store from "../../store/index.jsx";
import jwt from 'jsonwebtoken';
import jwtsecret from "../../../jwtsecret.js";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {poll: null, newOption: "", selected: null};
    try{
      this.user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      this.user = undefined;
    }
  }

  // Custom Methods
  setSelected(event){
    if(event.target.tagName === "INPUT")
      this.setState({selected: event.target.value})
  }
  setNewOption(event){
    this.setState({newOption: event.target.value});
  }
  addOption(){
    Axios.post("/api/polls/create-poll-option", {poll_id: this.state.poll.id, option_content: this.state.newOption})
    .then(result => {
      this.retrievePollData(this.state.poll.id);
    })
    .catch(err => {
      console.log(err);
    })
  }
  handleKeyPress(event){
    if(event.key === 'Enter')
      this.addOption();
  }
  retrievePollData(pollId){
    Axios.post("/api/polls/retrieve-single-poll", {id: pollId})
    .then(result => {
      console.log(result.data)
      this.setState({poll: result.data, newOption: ""});
    })
    .catch(err => {
      console.log(err);
    })
  }
  displayPollOptions(){
    // render poll options
    var options = this.state.poll.options.map( (val, i) => {
      return (
        <div key={i}>
          <input type="radio" name="option" value={val.id} /> {val.option_content}
        </div>
      )
    });

    // render additional option input if logged in
    if(this.user){
      var addOption = (
        <div className="poll-options-add">
          <input type="text" placeholder="Don't like the options? add your own"
            value={this.state.newOption}
            onChange={this.setNewOption.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)} />
          <button type="button" onClick={this.addOption.bind(this)}>+</button>
        </div>
      )
    }
    else{
      var addOption = (
        <div className="poll-options-add">
          <div>Log in to add a new option</div>
        </div>
      )
    }

    return (
      <div className="form">
        <div className="poll-options-list" onClick={this.setSelected.bind(this)}>
          {options}
        </div>
        {addOption}
        <div className="poll-options-other">
          <button type="button" onClick={this.submitVote.bind(this)}>Submit</button>
          <Link to={"/chart/"+this.state.poll.id}>View Poll Results</Link>
        </div>
      </div>
    )
  }
  submitVote(){
    if(this.state.selected){
      let data = {
        poll_id: this.state.poll.id,
        option_id: this.state.selected,
        voted_users: this.state.poll.voted_users,
        user: this.user
      }

      Axios.put("/api/polls/submit-vote", data)
      .then(result => {
        this.props.history.push("/chart/"+this.state.poll.id);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  componentDidMount(){
    this.retrievePollData(this.props.pollId);
  }
  componentWillReceiveProps(nextProps){
    this.retrievePollData(nextProps.pollId)
  }

  render(){
    if(this.state.poll){
      let options = this.displayPollOptions();

      return (
        <div id="polls-view">
          <h3>{this.state.poll.title}</h3>
          <small>Created by {this.state.poll.user.username}</small>
          {options}
          <div className="links">
            <Link to={"/polls"}>View other polls</Link>
          </div>
        </div>
      )
    }
    else{
      return(
        <div id="polls-view">
          <i className="loading fa fa-spinner fa-spin"></i>
        </div>
      )
    }
  }
}

export default withRouter(App);
