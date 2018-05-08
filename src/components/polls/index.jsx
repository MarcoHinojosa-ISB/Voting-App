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
      var content = <PollList type="list"/>
    else if(this.props.type === "list-own")
      var content = <PollList type="list-own"/>
    else if(this.props.type === "create")
      var content = <PollCreate />
    else if(this.props.type === "view")
      var content = <PollView pollId={this.props.match.params.id}/>


    return (
      <div id="poll-content">
        {content}
      </div>
    );
  }
}

export default App;
