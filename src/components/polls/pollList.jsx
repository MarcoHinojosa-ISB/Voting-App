import React from "react";
import Moment from "moment";
import Axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import store from '../../store/index.jsx';
import jwt from 'jsonwebtoken';
import jwtsecret from "../../../jwtsecret.js";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {polls: [], listType: "", loading: true, pollToBeDeleted: {id: null, title: null, date_created: null}};

    try{
      this.user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      this.user = null;
    }
  }

  // Custom methods
  retrievePolls(type){
    if(type === "list-own"){
      let data = {uname: this.user.username};

      Axios.get("/api/polls/retrieve-own-polls?uname="+this.user.username)
      .then(result => {
        this.setState({polls: result.data, loading: false, listType: "list-own"});
      })
      .catch(err => {
        console.log(err);
      })
    }
    else{
      Axios.get("/api/polls/retrieve-polls")
      .then(result => {
        this.setState({polls: result.data, loading: false, listType: "list"});
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  displayPolls(){
    return this.state.polls.map( (val, i) => {
      let tmpDate = Moment(new Date(val.date_created), 'MM-DD-YYYY').format('MM/DD/YYYY');

      return this.state.listType === "list-own" ? (
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
  displayHeading(){
    return this.state.listType === "list-own" ? (
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
    )
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
    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle error yet
    }
    if(this.state.listType === "list-own" && !user.username)
      this.props.history.push("/");
  }
  componentDidMount(){
    //get poll data, either all or own
    this.retrievePolls(this.props.type);
  }
  componentWillReceiveProps(nextProps){
    //in case the user activates "delete prompt", does nothing
    if(nextProps.type === "list")
      this.hidePrompt();

    this.retrievePolls(nextProps.type);
  }

  render(){
    //get table data
    var heading = this.displayHeading();
    var polls = this.displayPolls();

    if(this.state.loading){
      var content = (<i className="loading fa fa-spinner fa-spin"></i>);
    }
    else if(polls.length > 0){
      var content = (
        <div>
          <table className="heading">
            <tbody>
              {heading}
            </tbody>
          </table>
          <table className="list">
            <tbody>
              {polls}
            </tbody>
          </table>
        </div>
      );
    }
    else{
      var content = (<h3>No polls created. . .</h3>);
    }


    if(this.state.listType === "list-own"){
      var links = (
        <div className="links">
          <Link to={"/polls"}>View all polls</Link>
        </div>
      )
    }
    else{
      var links = (
        <div className="links">
        </div>
      )
    }

    return (
      <div id="polls-list">
        <h1>{this.state.listType === "list-own" ? ("My Polls") : ("Polls")}</h1>

        {content}
        {links}

        <div className="delete-prompt">
          <div className="overlay"></div>
          <div className="content">
            <h4>Are you sure you want to delete this poll?</h4>
            <h6>[{this.state.pollToBeDeleted.title}]</h6>
            <div className="prompt-btns">
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
