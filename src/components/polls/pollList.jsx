import React from "react";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {polls: []};
    this.displayPolls = this.displayPolls.bind(this);
  }
  // Custom methods
  displayPolls(){
    return this.state.polls.map(function(val, i){
      return (<div key={i}>{val} test</div>)
    })
  }

  // Life cycle methods
  componentWillMount(){
    if(this.props.owner)
      var url = "/api/polls/retrieve-own-polls";
    else
      var url = "/api/polls/retrieve-polls";

    $.ajax({
      type: "get",
      url: url,
      success: function(result){
        this.state.polls = result;
      }.bind(this),
      error: function(error){
        this.state.polls = [];
        console.log(error);
      }
    })
  }
  render(){
    return (
      <div>
        <div className="list">
          {displayPolls}
        </div>
        <div className="filter">
        </div>
      </div>
    )
  }
}

export default App;
