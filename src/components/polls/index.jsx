import React from 'react';
import PollList from './pollList.jsx';
import PollCreate from './pollCreate.jsx';
import Poll from './poll.jsx';

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
    else if(this.props.type === "single")
      var content = <div></div>

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
