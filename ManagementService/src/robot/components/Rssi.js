import React, { Component } from 'react';
import '../css/rssi.css';

export default class Rssi extends Component{
    constructor(props)
    {
        super(props)
        this.state = Object.assign({
            db: -99,
            simulate: false
        },props);
        
        if(this.state.simulate)
            setInterval(()=>this.setState({db:(Math.random() * -41)-30}),1500);
    }
    render(){
        return(
            <div className="rssi">
                <div className="bar">
                    <div className={"box " + (this.state.db>-35?'active':'')}></div>
                    <div className={"box " + (this.state.db>-45?'active':'')}></div>
                    <div className={"box " + (this.state.db>-60?'active':'')}></div>
                    <div className={"box " + (this.state.db>-65?'active':'')}></div>
                    <div className={"box " + (this.state.db>-70?'active':'')}></div>                    
                </div>
                <div className="val">
                    <div>DB</div> <div>{Number(this.state.db).toFixed(2)}</div>
                </div>
            </div>
        );
    }
}