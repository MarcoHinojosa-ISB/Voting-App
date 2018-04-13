import React from 'react';
import Login from './login.jsx';
import Signup from './signup.jsx';


class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let form = this.props.login ? (<Login />) : (<Signup />);

    return (
      <div id="auth">
        {form}
      </div>
    )
  };
}

export default App;
