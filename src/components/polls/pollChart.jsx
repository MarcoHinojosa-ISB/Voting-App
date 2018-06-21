import React from 'react';
import Axios from "axios";
import {Link, withRouter} from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {poll: null, totalVotes: 0};
  }
  retrievePollData(pollId){
    Axios.post("/api/polls/retrieve-single-poll", {id: pollId})
    .then(result => {
      var totalVotes=0;

      for(let i=0; i < result.data.options.length; i++){
        totalVotes += result.data.options[i].votes;
      }

      this.setState({poll: result.data, totalVotes: totalVotes});
    })
    .catch(err => {
      console.log(err);
    })
  }
  displayData(){
    return this.state.poll.options.map( (val, i) => {
      var percentage = this.state.totalVotes === 0 ? 0 : ((val.votes / this.state.totalVotes) * 100);

      return (
        <tr className="row" key={i}>
          <td className="label"><span>{val.option_content}</span></td>
          <td className="percentage">{percentage.toFixed(2)}%</td>
          <td className="bar">
            <div className={"bar-"+Math.round(percentage)}></div>
          </td>
          <td className="votes">{val.votes}</td>
        </tr>
      )
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
      let data = this.displayData();

      return (
        <div id="polls-chart">
          <h3>{this.state.poll.title} - Results</h3>
          <table className="chart">
            <tbody>
              {data}
            </tbody>
          </table>
          <div className="total">
            <div className="label"><b>Total votes</b></div>
            <div className="votes"><b>{this.state.totalVotes}</b></div>
          </div>
          <div className="links">
            <Link to={"/poll/"+this.state.poll.id}>VOTE!!!</Link>
            <Link to="/polls">View other polls</Link>
          </div>
        </div>
      )
    }
    else{
      return (
        <div id="polls-chart">
          <i className="loading fa fa-spinner fa-spin"></i>
        </div>
      )
    }
  }
}

export default withRouter(App);
