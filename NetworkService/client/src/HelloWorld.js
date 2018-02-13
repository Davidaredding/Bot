import React from 'react';
 
// class HelloWorld extends Component {
//   render() {
//     return (
//       <div className="helloContainer">
//         <h1>Hello, world!</h1>
//       </div>
//     );
//   }
// }

class WSTest extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      message:"",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }
  
  
  handleSubmit(event){
    event.preventDefault();
    console.dir(this.state);
  }

  handleMessageChange(event){
    this.setState({message: event.target.value});
    event.preventDefault();
  }

  render(){
    return(
      <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="messageToSend" value={this.state.message} onChange={this.handleMessageChange} />
            <button submit="submit" >Send</button>
          </form>
          <div>

          </div>
      </div>
    );
  }
}
 
export default WSTest;