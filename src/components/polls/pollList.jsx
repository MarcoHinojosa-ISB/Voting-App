import React from "react";
import Moment from "moment";
import Axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import store from '../../store/index.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {polls: [], listType: ""};
  }
  // Custom methods

  displayPolls(){
    return this.state.polls.map( (val, i) => {
      let tmpDate = Moment(new Date(val.date_created), 'MM-DD-YYYY').format('MM/DD/YYYY');

      return this.props.type === "list-own" ? (
        <tr className="poll-row" key={i}>
          <td className="title"><Link to={"/polls/"+val.id}>{val.title}</Link> <small>[{val.sum} votes]</small></td>
          <td className="date-created"><small>{tmpDate}</small></td>
          <td className="delete"><i className="fa fa-window-close" onClick={this.deletePoll.bind(this, val)}></i></td>
        </tr>
      ) : (
        <tr className="poll-row" key={i}>
          <td className="title"><Link to={"/polls/"+val.id}>{val.title}</Link> <small>[{val.sum} votes]</small></td>
          <td className="date-created"><small>{tmpDate}</small></td>
          <td className="delete"></td>
        </tr>
      )
    })
  }

  deletePoll(val){
    Axios.delete("/api/polls/delete-poll", {data: {id: val.id}})
    .then( result => {
      let tmp = this.state.polls.filter(function(val2, i){
        return val2.id !== val.id;
      });
      this.setState({polls: tmp});
    })
    .catch( err => {
      console.log(err);
    })
    console.log(val);
  }

  // Life cycle methods
  componentWillMount(){
    if(!store.getState().user.username)
      this.props.history.push("/");
  }
  render(){
    console.log(this.props.type)
    if(this.state.listType !== this.props.type){
      if(this.props.type === "list-own"){
        let data = {uname: store.getState().user.username};

        Axios.post("/api/polls/retrieve-own-polls", data)
        .then(result => {
          this.setState({polls: result.data, listType: "list-own"});
        })
        .catch(err => {
           console.log(err);
        })
      }
      else{
        Axios.get("/api/polls/retrieve-polls")
        .then(result => {
          this.setState({polls: result.data, listType: "list"});
        })
        .catch(err => {
           console.log(err);
        })
      }
    }

    var tmp = this.displayPolls();
    return (
      <div id="poll-list">
        <h1>{this.props.type === "list-own" ? ("My Polls") : ("Polls")}</h1>
        <div className="list">

          <table>
            <tbody>
              {this.props.type === "list-own" ? (
                <tr>
                  <th className="title">Title</th>
                  <th className="date-created">Date</th>
                  <th><i className="fa fa-trash"></i></th>
                </tr>
              ) : (
                <tr>
                  <th className="title">Title</th>
                  <th className="date-created">Date</th>
                </tr>
              )}
              {tmp}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}

export default withRouter(App);
