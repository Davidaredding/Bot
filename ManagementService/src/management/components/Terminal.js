import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/Terminal.css';
import '../../css/animate.css';

export default class Terminal extends Component{
    constructor(props){
        super(props);
        

        this.onClick = this.onClick.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
        this.Input = this.Input.bind(this);
        this.Output = this.Output.bind(this);
        this.submit = this.submit.bind(this);
        this.Display = this.Display.bind(this);

        this.state=Object.assign({
            currentLine: "", 
            history:[],
            hasFocus:false,
            prompt:"$Director:",
            title:"Terminal"
        },props);
    }
    componentDidUpdate(){
        this.refs.term.scrollTop = this.refs.term.scrollHeight;
    }
    
    Input(val){
        this.setState({currentLine:val}, ()=>this.submit());
    }

    Display(val){
        var merged = this.state.history.slice();
        merged.push(val);
        this.setState({history:merged});
    }

    Output(val){
        if(this.state.Output)
        {
            this.state.Output(val);
            return;
        }
        //check for commands
        var txt = val.toLowerCase();
        if(txt === 'cls' || txt === 'clear')
            return this.__clear();

        this.Display(val);
    }

    //processes whatever is in currentLine
    submit(){
        this.Output(this.state.currentLine);
        this.setState({currentLine:""});
    }

    __clear= ()=>{
        this.setState({history:[]});
    }

    onClick(evt){ReactDOM.findDOMNode(this.refs.inputLine).focus();}
    onFocus(){this.setState({hasFocus:true});}
    onBlur(){this.setState({hasFocus:false});}
    onInput(evt){this.setState({currentLine:evt.target.value});}
    
    onSubmit(evt){
        evt.preventDefault();
        this.submit();
    }

    render(){
        const history = this.state.history.map((h,i)=>
            <div className="historyItem" key={i}>
                <span>{this.state.prompt}</span> {h} </div>
        );

        return(
        <div className='terminal' onClick={this.onClick}>
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