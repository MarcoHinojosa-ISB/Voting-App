import React from 'react';
import ReactDom from 'react-dom';
import Polls from "./polls/index.jsx";

class App extends React.Component{
  render(){
    return (
      <div>
        <Polls />
      </div>
    )
  }
}

export default App;
// ReactDom.render(<Polls />, document.getElementById("app"));
