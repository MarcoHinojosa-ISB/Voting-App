import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(val){
    this.props.onTabChange(val);
  }

  render(){
    let tab1 = this.props.login ?
     (<div className="active" onClick={()=>this.changeTab(true)}>Log in</div>) :
     (<div onClick={()=>this.changeTab(true)}>Log in</div>);
    let tab2 = this.props.login ?
     (<div onClick={()=>this.changeTab(false)}>Sign up</div>) :
     (<div className="active" onClick={()=>this.changeTab(false)}>Sign up</div>);

    return (
      <div id="login-tab">
        {tab1}
        {tab2}
      </div>
    )
  }
}

export default App;
