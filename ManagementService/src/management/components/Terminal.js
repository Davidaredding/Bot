import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/Terminal.css';
import '../../css/animate.css';

export default class Terminal extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state=Object.assign({
            currentLine: "", 
            history:[],
            hasFocus:false,
            prompt:"$Director:",
            title:"Terminal"
        },props);
        


        this.onClick = this.onClick.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
    }
    componentDidUpdate(){
        this.refs.term.scrollTop = this.refs.term.scrollHeight;
    }
    

    onClick(evt){ReactDOM.findDOMNode(this.refs.inputLine).focus();}
    onFocus(){this.setState({hasFocus:true});}
    onBlur(){this.setState({hasFocus:false});}
    onInput(evt){
        this.setState({currentLine:evt.target.value});
    }
    onSubmit(evt){
        evt.preventDefault();
        var merged = this.state.history.slice();
        merged.push(this.state.currentLine);
        this.setState({history:merged, currentLine:""});
        this.refs.term.scrollTop = this.refs.term.scrollHeight;
    }

    render(){
        const history = this.state.history.map((h)=>
            <div className="historyItem">{this.state.prompt} {h} </div>
        );

        return(
        <div className=
            {`item terminal
             ${this.state.hasFocus?'terminal_focused' : 'terminal_not_focused'}`
            }
            onClick={this.onClick}>

          <header> {this.state.title} </header>
          <div className="term" ref="term">
            {history}
            <form className="input" onSubmit={this.onSubmit}>
                <span>{this.state.prompt} </span>
                <input ref="inputLine" 
                    value={this.state.currentLine}
                    onChange={this.onInput}
                    onFocus={this.onFocus} 
                    onBlur={this.onBlur}/>
            </form>
          </div>
        </div>
        );
    }
}