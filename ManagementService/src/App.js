import React, { Component } from 'react';
import Terminal from './management/components/Terminal';
import Rssi from './robot/components/Rssi';
import Battery from './robot/components/BatteryLevel';


import Panel from './app/Panel'
import './App.css';


/*
// class WS extends Component{
//   constructor(props){
//     super(props);
//     this.handleMessage = this.handleMessage.bind(this);
//     this.sendMessage = this.sendMessage.bind(this);

//     const socket = new WebSocket('ws://localhost:8080/echo');
//     socket.onmessage = (ev)=>{this.handleMessage(ev)};
//     console.log("Connecting to socket");

//     this.state = {
//       socket: socket,
//       value: '',
//       onMsgCb: props.onMessage
//     }
//   }

//   handleMessage(message){
//     this.state.onMsgCb(message.data);
//   }

//   sendMessage(message){
//     this.state.socket.send(message);
//   }

//   render(){return ''}
// }

// function Message(props){
//  return <div className="app-message">{props.message}</div>
// }

// class MessageList extends Component
// {
//   constructor(props){
//     super(props);
//     this.state = {Messages: props.messages};
//   };
  
//   render(){
//     var key = 0;
//     const msgList = this.state.Messages.map((msg)=><Message message={msg} key={key++}/>);

//     return(
//       <div className="app-messageList">
//         {msgList}
//       </div>
//     )};
// }

// class MessageAdder extends Component
// {
//   constructor(props){
//     super(props);
//     this.addMessage = this.addMessage.bind(this);
//     this.state={addMessageFunc: props.addMessageFunc};
//   }
//   addMessage(){
//     this.state.addMessageFunc("test");
//   }
//   render(){
//     return(
//       <button onClick={this.addMessage}>Add</button>
//       )
//     }
// }*/


class App extends Component {
  constructor(props){
    super(props);
    this.state = {Messages:[]};
    //this.addMessage = this.addMessage.bind(this);
    //this.sendMessage = this.sendMessage.bind(this);
  }
/*
  addMessage(message){
    var newMessage = this.state.Messages;
    newMessage.push(message);
    this.setState({Messages:newMessage});
  };
  sendMessage(message){
    this.wsref.sendMessage(message);
  }
*/
  

  render() {
    return(
      <div className="container">
        <div className="column col1">
          {/* <Panel preTitle="" title="Terminals" style={{minWidth:500, minHeight:0}}>
            <Terminal prompt="$:"/>
            <hr />
            <Terminal prompt="$Director:"/>
          </Panel> */}
          
          <div className="panelContainer">
            
            <Panel preTitle="" title="Power" style={{width:64, flexGrow:0}}>
              <div style={{display:"flex", flexDirection:"Row", flex:1, width:64, height:64}}>
                <Battery voltage="4.1"/>
                <Battery voltage="4.0"/>
              </div>
            </Panel>

            <Panel preTitle="" title="RSSI" style={{minHeight:0, minWidth:0, flexGrow:0}}>
              <Rssi simulate={true}/>
            </Panel>
          </div>
        
        </div>
      </div>
    );
  }
}

export default App;
