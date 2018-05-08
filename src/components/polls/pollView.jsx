import React from "react";
import Axios from "axios";
import store from "../../store/index.jsx";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {poll: null, newOption: "", selected: null, showResults: false};
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
      console.log(result.data);
      this.setState({poll: result.data, newOption: ""});
    })
    .catch(err => {
      console.log(err);
    })
  }
  displayPollOptions(){
    var options = this.state.poll.options.map( (val, i) => {
      return (
        <div key={i}>
          <input type="radio" name="option" value={val.id} /> {val.option_content}
        </div>
      )
    });

    // Check if user is logged in
    if(store.getState().user.username){
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
      var addOption = (<div></div>)
    }

    return (
      <div className="form">
        <div className="poll-options-list" onClick={this.setSelected.bind(this)}>
          {options}
        </div>
        {addOption}
        <div className="poll-options-other">
          <button type="button" onClick={this.submitVote.bind(this)}>Submit</button>
          <span onClick={this.showResults.bind(this)}>View Poll Results</span>
        </div>
      </div>
    )
  }
  submitVote(){
    if(this.state.selected){
      Axios.put("/api/polls/submit-vote", {id: this.state.selected})
      .then(result => {
        this.setState({selected: null, showResults: true})
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  showResults(){
    this.setState({selected: null, showResults: true});
  }
  displayChartLabels(){
    return this.state.poll.options.map( (val, i) => {
      return <div key={i} className="label">{val.option_content}</div>
    })
  }
  displayChartBars(){
    var totalVotes = 0;
    for(let i=0; i<this.state.poll.options.length; i++){
      totalVotes += this.state.poll.options[i].votes;
    }


    return this.state.poll.options.map( (val, i) => {
      let className = "vote-percentage-"+ Math.round((val.votes / totalVotes) * 100);
      return <div key={i} className={className}></div>
    })
  }

  componentDidMount(){
    this.retrievePollData(this.props.pollId);
  }
  componentWillReceiveProps(nextProps){
    this.retrievePollData(nextProps.pollId)
  }

  render(){
    if(this.state.poll){
      if(this.state.showResults){
        let labels = this.displayChartLabels();
        let bars = this.displayChartBars();

        return (
          <div id="poll-view">
            <h1>Results of {this.state.poll.title}</h1>
            <div className="chart">
              <div className="labels">{labels}</div>
              <div className="bars">{bars}</div>
            </div>
          </div>
        )
      }
      else{
        let options = this.displayPollOptions();

        return (
          <div id="poll-view">
            <h1>{this.state.poll.title}</h1>
            {options}
          </div>
        )
      }
    }
    else{
      return(
        <div id="poll-view">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      )
    }
  }
}

export default App;
