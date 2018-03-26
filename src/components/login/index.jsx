import React from 'react';
import Tabs from './tabs.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {login: false};
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(val){
    this.setState({login: val});
  }

  render(){
    let form = this.state.login ? (<Login />) : (<Signup />);

    return (
      <div id="login">
        <Tabs login={this.state.login} onTabChange={this.onTabChange}/>
        {form}
      </div>
    )
  };
}

export default App;
