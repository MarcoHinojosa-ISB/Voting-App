import React from 'react';
import Login from './login.jsx';
import Signup from './signup.jsx';


class App extends React.Component {
  constructor(props){
    super(props);
  }

  onTabChange(val){
    this.setState({login: val});
  }

  render(){
    let form = this.props.login ? (<Login />) : (<Signup />);
    console.log(this.props)

    return (
      <div id="login">
        {form}
      </div>
    )
  };
}

export default App;
