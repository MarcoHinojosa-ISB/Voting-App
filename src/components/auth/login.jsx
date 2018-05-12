import React from 'react';
import Axios from 'axios';
import {withRouter} from "react-router-dom";
import store from '../../store/index.jsx';
import {loggedIn} from '../../store/actions/userActions.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {uname: "", pass: "", error: ""};
  }

  // Custom Methods
  setUname(event){
    this.setState({uname: event.target.value})
  }
  setPass(event){
    this.setState({pass: event.target.value})
  }
  handleSubmit(event) {
    Axios.post("/api/auth/log-in", this.state)
    .then(result => {
      store.dispatch(loggedIn(result.data.user.username, result.data.user.firstname, result.data.user.lastname));
      this.props.history.push(result.data.redirect);
    })
    .catch(err => {
      console.log(err.response.status);
      if(err.response.status === 404)
        this.setState({error: "Something went wrong, try again later"});
      else
        this.setState({error: err.response.data});
    })
    event.preventDefault();
  }

  // Life Cycle Methods
  componentWillMount(){
    if(store.getState().user.username)
      this.props.history.push("/");
  }
  render(){
    if(this.state.error.length > 0)
      var error = (<small>{this.state.error}</small>);

    return (
      <div id="login">
        <h3>Enter Login Info</h3>
        {error}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="username" onChange={this.setUname.bind(this)}/>
          <input type="password" placeholder="password" onChange={this.setPass.bind(this)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  };
}

export default withRouter(App);
