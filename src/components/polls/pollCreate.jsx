import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {title: "", options: [], newOption: ""};
    this.setTitle = this.setTitle.bind(this);
    this.setNewOption = this.setNewOption.bind(this);
    this.addOption = this.addOption.bind(this);
  }

  setTitle(event){
    this.setState({title: event.target.value});
  }
  setNewOption(event){
    this.setState({newOption: event.target.value});
  }
  addOption(event){
    let tmp = this.state.options;
    tmp.push(this.state.newOption);

    this.setState({options: tmp, newOption: ""});
  }
  render(){
    let options = this.state.options.map(function(val, i){
      return (<div key={i}>{val}</div>)
    });

    return (
      <div id="poll-create">
        <form>
          <input type="text" placeholder="Title" onChange={this.setTitle}/>
          {options}
          <div className="option-input">
            <input type="text" placeholder="New option" onChange={this.setNewOption}/>
            <button type="button" onClick={this.addOption}>+</button>
          </div>
        </form>
      </div>
    )
  }
}

export default App;
