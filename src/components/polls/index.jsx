import React from 'react';
import PollList from './pollList.jsx';
import PollCreate from './pollCreate.jsx';
import PollView from './pollView.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.type === "list")
      var content = <PollList owner={false} />
    else if(this.props.type === "list-owner")
      var content = <PollList owner={true} />
    else if(this.props.type === "create")
      var content = <PollCreate />
    else if(this.props.type === "view")
      var content = <div></div>

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
