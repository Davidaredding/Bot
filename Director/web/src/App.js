import React, { Component } from 'react';
import './App.css';


class WS extends Component{
  constructor(props){
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    const socket = new WebSocket('ws://localhost:8080/echo');
    socket.onmessage = (ev)=>{this.handleMessage(ev)};
    console.log("Connecting to socket");

    this.state = {
      socket: socket,
      value: '',
      onMsgCb: props.onMessage
    }
  }

  handleMessage(message){
    this.state.onMsgCb(message.data);
  }

  sendMessage(message){
    this.state.socket.send(message);
  }

  render(){return ''}
}

function Message(props){
 return <div className="app-message">{props.message}</div>
}

class MessageList extends Component
{
  constructor(props){
    super(props);
    this.state = {Messages: props.messages};
  };
  
  render(){
    var key = 0;
    const msgList = this.state.Messages.map((msg)=><Message message={msg} key={key++}/>);

    return(
      <div className="app-messageList">
        {msgList}
      </div>
    )};
}

class MessageAdder extends Component
{
  constructor(props){
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.state={addMessageFunc: props.addMessageFunc};
  }
  addMessage(){
    this.state.addMessageFunc("test");
  }
  render(){
    return(
      <button onClick={this.addMessage}>Add</button>
      )
    }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {Messages:[]};
    this.addMessage = this.addMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  addMessage(message){
    var newMessage = this.state.Messages;
    newMessage.push(message);
    this.setState({Messages:newMessage});
  };

  sendMessage(message){
    this.wsref.sendMessage(message);
  }

  render() {
    return(
      <div>
        <WS onMessage={this.addMessage} ref={Websocket=>{this.wsref = Websocket}}/>
        <MessageAdder addMessageFunc = {this.sendMessage} />
        <MessageList messages={this.state.Messages}/>
      </div>
    );
  }
}

export default App;
