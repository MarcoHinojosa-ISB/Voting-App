import React from "react";
import Moment from "moment";
import Axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import store from '../../store/index.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {polls: [], listType: "", pollToBeDeleted: {id: null, title: null, date_created: null}};
  }
  // Custom methods
  retrievePolls(){
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
  }
  displayPolls(){
    return this.state.polls.map( (val, i) => {
      let tmpDate = Moment(new Date(val.date_created), 'MM-DD-YYYY').format('MM/DD/YYYY');

      return this.props.type === "list-own" ? (
        <tr className="row" key={i}>
          <td className="title"><Link to={"/poll/"+val.id}>{val.title}</Link> <small>[{val.sum} votes]</small></td>
          <td className="date-created"><small>{tmpDate}</small></td>
          <td className="delete"><i className="fa fa-window-close" onClick={this.showPrompt.bind(this, val)}></i></td>
        </tr>
      ) : (
        <tr className="row" key={i}>
          <td className="title all"><Link to={"/poll/"+val.id}>{val.title}</Link> <small>[{val.sum} votes]</small></td>
          <td className="date-created"><small>{tmpDate}</small></td>
          <td className="delete"></td>
        </tr>
      )
    })
  }

  showPrompt(val){
    document.getElementsByClassName("delete-prompt")[0].style.display = "block";
    this.setState({pollToBeDeleted: val});
  }
  hidePrompt(){
    document.getElementsByClassName("delete-prompt")[0].style.display = "none";
    this.setState({pollToBeDeleted: {id: null, title: null, date_created: null}});
  }

  deletePoll(){
    Axios.delete("/api/polls/delete-poll", {data: {id: this.state.pollToBeDeleted.id}})
    .then( result => {
      let tmp = this.state.polls.filter(val2 => {
        return val2.id !== this.state.pollToBeDeleted.id;
      });
      this.setState({polls: tmp});

      this.hidePrompt();
    })
    .catch( err => {
      console.log(err);
    })
  }

  // Life cycle methods
  componentWillMount(){
    if(this.props.type === "list-own" && !store.getState().user.username)
      this.props.history.push("/");
  }
  componentDidMount(){
    //get poll data, either all or self-made
    this.retrievePolls();
  }
  componentWillReceiveProps(nextProps){
    //in case the user activates "delete prompt", does nothing, then goes to list of ALL polls
    if(nextProps.type === "list")
      this.hidePrompt();
  }

  render(){
    //get poll list rendered
    var tmp = this.displayPolls();

    return (
      <div id="polls-list">
        <h1>{this.props.type === "list-own" ? ("My Polls") : ("Polls")}</h1>

          <table className="heading">
            <tbody>
              {this.props.type === "list-own" ? (
                <tr>
                  <th className="title"><b>Title</b></th>
                  <th className="date-created"><b>Date</b></th>
                  <th className="delete"><i className="fa fa-trash"></i></th>
                </tr>
              ) : (
                <tr>
                  <th className="title"><b>Title</b></th>
                  <th className="date-created"><b>Date</b></th>
                  <th className="delete"></th>
                </tr>
              )}
            </tbody>
          </table>
        <div className="list">
          <table>
            <tbody>

              {tmp}
            </tbody>
          </table>
        </div>

        <div className="delete-prompt">
          <div className="overlay"></div>
          <div className="content">
            <h4>Are you sure you want to delete this poll?</h4>
            <h6>[{this.state.pollToBeDeleted.title}]</h6>
            <div>
              <button className="confirm" onClick={this.deletePoll.bind(this)}>Yes</button>
              <button className="cancel" onClick={this.hidePrompt.bind(this)}>No</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
